import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import FileAttachment from "./FileAttachment";

import { wrapper } from "./test.util";
import {
  mockBigSizeFile,
  mockBigSizeFiles,
  mockFile,
  mockFiles,
} from "./fixture";

const onChange = jest.fn();
const onError = jest.fn();
const id = "file-input";

let fileInput: HTMLElement;

beforeEach(() => {
  render(
    <FileAttachment
      id={id}
      nowSize={0}
      onChange={onChange}
      onError={onError}
    />,
    { wrapper }
  );
  fileInput = screen.getByLabelText("파일 첨부");
});

describe("파일 1개 추가시", () => {
  it("onChange 함수를 호출한다.", () => {
    fireEvent.change(fileInput, {
      target: {
        files: [mockFile],
      },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("UI를 변경한다.", async () => {
    fireEvent.change(fileInput, {
      target: {
        files: [mockFile],
      },
    });

    expect(screen.getByTitle(mockFile.name)).toBeInTheDocument();
  });

  it("사이즈가 50MB 이상이라면 onError 함수를 호출한다.", () => {
    fireEvent.change(fileInput, {
      target: {
        files: [mockBigSizeFile],
      },
    });
    expect(onError).toHaveBeenCalled();
  });

  //   it("서버에서 에러가 발생한다면 onError 함수를 호출한다.", async () => {
  //     // nock("http://localhost:3000").post("/posts", []).reply(500);

  //     const { result } = renderHook(usePostFileInfo, { wrapper });
  //     act(() => {
  //       result.current.mutateAsync([mock]);
  //     });
  //     // console.log(result.current);
  //     //   expect(result.current.mutate).toThrow(Error());
  //     //   act(() => {
  //     //     result.current.mutate([]);
  //     //   });
  //     await waitFor(() => {
  //       return expect(result.current.isError).toBe(true);
  //     });

  //     expect(onChange).toHaveBeenCalledWith("error");
  //     // await waitFor(() => {
  //     //   return expect(result.current.isSuccess).toBe(true);
  //     // });
  //     // await waitFor(() => expect(onError).toHaveBeenCalled());
  //   });
});

describe("파일 N개 추가시", () => {
  it("onChange 함수를 호출한다.", () => {
    fireEvent.change(fileInput, {
      target: {
        files: mockFiles,
      },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("UI를 변경한다.", () => {
    fireEvent.change(fileInput, {
      target: {
        files: mockFiles,
      },
    });
    mockFiles.forEach((mockFile) => {
      expect(screen.getByTitle(mockFile.name)).toBeInTheDocument();
    });
  });

  it("전체 사이즈가 50MB 이상이라면 onError 함수를 호출한다.", () => {
    fireEvent.change(fileInput, {
      target: {
        files: mockBigSizeFiles,
      },
    });
    expect(onError).toHaveBeenCalled();
  });
  //   it("서버에서 에러가 발생한다면 onError 함수를 호출한다.", () => {});
});

describe("파일 삭제시", () => {
  it("onChange 함수를 호출한다.", async () => {
    fireEvent.change(fileInput, {
      target: {
        files: mockFiles,
      },
    });
    const order = 0;
    const deleteButton = screen.getAllByTitle("첨부 파일 삭제")[order];
    fireEvent.click(deleteButton);
    expect(onChange).toHaveBeenCalled();
  });

  it("UI를 변경한다.", () => {
    fireEvent.change(fileInput, {
      target: {
        files: mockFiles,
      },
    });
    const order = 0;
    const deleteButton = screen.getAllByTitle("첨부 파일 삭제")[order];
    fireEvent.click(deleteButton);
    expect(screen.queryByTitle(mockFiles[order].name)).toBeNull();
  });
});

describe("파일이 존재하지 않을 때", () => {
  it("알맞은 UI를 노출한다.", () => {
    expect(screen.queryByTestId("attached-file-item")).toBeNull();
  });
});
