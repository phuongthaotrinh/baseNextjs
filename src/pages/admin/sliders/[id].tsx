
import { useRouter } from 'next/router';
import { Button, Form , message } from "antd";
import { HeaderAction } from '@/components/common';
import { useEffect, useState } from "react";
import { SharedIcons } from "@/utils";
import Link from "next/link";
import SliderForm from "./components/SliderForm";
const { ArrowLeftOutlined } = SharedIcons;

const SliderDetail = () => {
    const [mode, setMode] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const route = useRouter();
    const id = route.query.id;
    const [form] = Form.useForm();
    const [isPublish, setIsPublish]= useState<any>(false);

    useEffect(() => {
        if (id == "create" || id === undefined) {
            setMode("create");
        }else{
            setMode(`Update: ${id}`);
        }
    }, [id]);

    useEffect(() => {
        if(mode && id && (mode !== "create" && id !== "create")){
          resetData();
        }
    },[id, mode])

    const resetData = () =>{
       if(data){
           setIsPublish(data.isPushlish);
           form.setFieldsValue({
               ...data
           });
       }
    }

    const onFinish = (values: any) => {
        console.log("values", values);
    }

    const onReset = () => {
        if(mode === "create"){
            form.resetFields()
        }else{
            resetData()
        }
    }

    return (
        <>
            {contextHolder}
            <HeaderAction title={`${mode === "create" ? "Thêm mới" : `${mode}`}`} components={[
                {
                    key: 1,
                    comp: <Link href="/admin/sliders"> <Button type="dashed" icon={<ArrowLeftOutlined />}>Quay lại</Button></Link>
                },
            ]} />
            <SliderForm
                form={form}
                onFinish={onFinish}
                onReset={onReset}
                formMode={mode}
                isPublish={isPublish}
                setIsPublish={setIsPublish}

            />
        </>
    )
}

export default SliderDetail;

export const data =
    {
        name: "qweqweqwe",
        cost: 123000,
        quantity: "123",
        isPushlish: false,
        discount :{type: 1, value: 10},
        short_desc: "123hgrfdcxsz",
        desc: ",kmhngbfvdcsxz",
        isPromotion: true,
        price: 111000
    }
