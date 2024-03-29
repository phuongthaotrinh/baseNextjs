import {Upload} from 'antd';
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface';
import React, {useState} from 'react';

type Props = {
    max: number,
    isMultiple: boolean
}
const UploadFile = ({max, isMultiple}: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const UploadMain = () => {
        return (
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                maxCount={max}
                multiple={isMultiple}
            >
                {fileList.length < max && '+ Upload'}
            </Upload>
        )
    }
    return (
        <UploadMain/>
    );

}
export default UploadFile;
