import Link from 'next/link';
import {Button, Tabs, Row, Col, Typography, Form} from 'antd';
import { SharedIcons } from '@/utils';
import { HeaderAction } from '@/components/common';
import { MyPage } from '@/models/common';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { listMovie } from '@/features/movie/actions';
import FetchData from './components/fetchData';
import FilterSection from "@/pages/admin/movie/components/FilterSection";
const { FaArrowRight, PlusOutlined } = SharedIcons;


const Index:MyPage = () => {
    const dispatch = useAppDispatch()
    const { data, pending } = useAppSelector((state) => state.listMovieReducer);
    const [dataActive, setDataActive] = useState<any[]>([]);
    const [dataInActive, setDataInActive] = useState<any[]>([]);
    const [openFilter,setOpenFilter ] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => { await dispatch(listMovie()) })();
    }, []);

    useEffect(() => {
        if (data) {
            setDataActive(data?.filter((item: any) => item?.status == 0));
            setDataInActive(data?.filter((item: any) => item?.status !== 0))
        }
    }, [data]);

    const onFinish = (values:any) => {
        console.log("onFinish", values)
    }

    const onReset = () => {
        form.resetFields();
        setOpenFilter(!openFilter)
    };
    const components = [
        {
            key: 'filterSection',
            comp: <FilterSection
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                form={form}
                onFinish={onFinish}
                onReset={onReset}
            />
        },
        {
            key: 1,
            comp: <Link href="/admin/products/create"> <Button type="dashed" icon={<PlusOutlined />}>Tạo sản phẩm </Button></Link>
        }
    ];
    const items: any[] = [
        {
            key: 1,
            label: `Sản phẩm đang bán (${dataActive.length})`,
            children: <FetchData dataSource={undefined} loading={pending} compStatus="active"/>
        },
        {
            key: 2,
            label: `Sản phẩm ngừng kinh doanh (${dataInActive.length}) `,
            children: <FetchData dataSource={undefined} loading={pending} compStatus="inActive"/>
        }
    ];




    return (
        <>
            <HeaderAction
                title="Danh sách sản phẩm"
                components={components}
            />
            <Tabs
                defaultActiveKey="1"
                size={"small"}
                style={{ marginBottom: 32 }}
                items={items}
            />
        </>
    )
}

export default Index;
Index.Layout="Admin";