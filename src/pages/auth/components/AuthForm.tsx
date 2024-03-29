import {LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons';
import {Button, Row, Col, Form, Input, Typography, Card, Divider, Grid} from 'antd';
import Link from "next/link"
import SocialLogin from "@/pages/auth/components/SocialLogin";
import {CSSProperties, useState, useEffect} from "react";

type Props = {
    form: any,
    isLogin?: boolean,
    onFinish: any,
    title: string,
    isLoading: boolean,
    mode: any
}
const styleMd: CSSProperties = {
    margin: "0 auto",
    width: "100%",
    padding: "10px 20px 40px 20px"
}
const styleMobile: CSSProperties = {
    padding: "10px",
    height: "100vh"
}
const {useBreakpoint} = Grid;


const AuthForm = ({form, isLogin, onFinish, title, isLoading, mode}: Props) => {
    const screens = useBreakpoint();
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, [mode]);

    return (
        <Card bodyStyle={!screens.xs ? styleMd : styleMobile}>
            <Form
                onFinish={onFinish}
                form={form}
                style={{width: `${screens.xs ? "100%" : "450px"}`}}
                layout="vertical"
            >
                <Typography.Title level={2} style={{textAlign: "center"}}>
                    {title}
                </Typography.Title>
                <Form.Item
                    label="Địa chỉ email"
                    name="email"
                    rules={[{type: 'email', required: true}]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon"/>}/>
                </Form.Item>
                {!isLogin && (
                    <Form.Item
                        label="Tên đăng nhập"
                        name="name"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}/>
                    </Form.Item>
                )}
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    {!isLogin ? (
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    ) : (
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                {!isLogin && (
                    <Form.Item
                        name="confirm"
                        label="Nhập lại mật khẩu"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input type="password" prefix={<LockOutlined className="site-form-item-icon"/>}/>
                    </Form.Item>
                )}
                <Form.Item>
                    {isLogin ? (
                        <Row justify="end" gutter={[16, 16]}>
                            <Col>
                                <Link href="/">
                                    Quên mật khẩu ?
                                </Link>
                            </Col>
                            <Col>
                                <Link className="login-form-forgot" href="/auth/register">
                                    Đăng Ký
                                </Link>
                            </Col>
                        </Row>
                    ) : (
                        <Row justify="start" gutter={[16, 16]}>
                            <Col>
                                <Typography.Text>
                                    Đã có tài khoản?
                                </Typography.Text>
                            </Col>
                            <Col>
                                <Link className="login-form-forgot" href="/auth/login">
                                    Đăng Nhập
                                </Link>
                            </Col>
                        </Row>
                    )}
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{width: "100%"}}
                            loading={isLoading}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({errors}: any) => errors.length).length
                            }
                        >
                            {isLogin ? "Đăng nhập" : "Đăng Ký"}
                        </Button>
                    )}
                </Form.Item>
                <div >
                    <Divider plain>Hoặc đăng nhập bằng</Divider>
                    <SocialLogin/>
                </div>
            </Form>
        </Card>
    )
}
export default AuthForm