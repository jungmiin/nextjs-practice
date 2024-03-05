import React, { useEffect, useState } from "react";
import usePostFileInfo from "./usePostFileInfo";
type Props = {
  id: string;
  nowSize: number;
  onChange: () => void;
  onError: () => void;
};

export default function FileAttachment({
  id,
  nowSize,
  onChange,
  onError,
}: Props) {
  const [attachedFiles, setAttachedFiles] = useState<object[]>([]);
  const { mutate } = usePostFileInfo();

  useEffect(() => {
    onChange();
  }, [attachedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.nativeEvent.stopPropagation();
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      let totalSize = nowSize;
      for (let file of fileList) {
        if (totalSize > 50 * 1024 * 1024) {
          onError();
          break;
        }
        totalSize += file.size;
      }
      if (totalSize > 50 * 1024 * 1024) {
        onError();
      }

      mutate(fileList, {
        onError: (error) => {
          console.log("error");
          onError();
        },
      });

      setAttachedFiles(
        fileList.map((file: any, i: number) => {
          return {
            id: i,
            name: file.name,
            size: file.size,
            type: file.ext,
          };
        })
      );
    }
  };

  const deleteFile = (id: number) => {
    setAttachedFiles(attachedFiles.filter((file: any) => file.id !== id));
  };

  return (
    <>
      <label htmlFor={id}>파일 첨부</label>
      <input id={id} type="file" onChange={handleFileChange} multiple />
      {attachedFiles.map((file: any, i) => {
        return (
          <div key={i}>
            <div data-testid="attached-file-item" title={file.name}>
              {file.name}
            </div>
            <button title="첨부 파일 삭제" onClick={() => deleteFile(i)}>
              삭제
            </button>
          </div>
        );
      })}
      {/* <div>업로드 중 에러가 발생하였습니다.</div> */}
    </>
  );
}
