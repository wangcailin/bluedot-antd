import React from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";


export default (
    { fileName, url, name }: any,

) => {
    const FetchFile = (option: any) => { // 获取附近专用
        console.log(option, "")

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'allowOrigin',
            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_NAME),
        }
        window.fetch(option.url, {
            method: option.method ? option.method : "POST",
            headers: headers,
            body: (option.method && option.method.toUpperCase() == "GET") ? null : JSON.stringify(option.data),
            dataType: option.dataType || 'blob',
            credentials: 'include',
        }).then((response) => {
            // 这里才是下载附件逻辑处理的地方
            response.blob().then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const aElement = document.createElement("a");
                // const filename = option.record.fileName; // 设置文件名称
                const filename = option.fileName; // 设置文件名称
                aElement.href = blobUrl; // 设置a标签路径
                aElement.download = filename;
                aElement.click();
                window.URL.revokeObjectURL(blobUrl);
            });
        }).catch((err) => {
            if (option.error && typeof option.error === "function") {
                option.error(err)
            }
            option.dispatch && option.dispatch({ type: 'HIDE_SPAN' })
        })
    }
    return (<Button
        icon={<ExportOutlined />}
        onClick={async () => {
            FetchFile({
                method: "GET",
                dataType: "blob",
                fileName: fileName,
                url: url,
            });

        }}
    >
        {name ?? "导出"}
    </Button>)
}
