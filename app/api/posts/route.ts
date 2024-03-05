import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const fileList = await request.json();
  console.log("POST", fileList);
  const mockResponse = fileList.map((file: any, i: number) => {
    return { id: i, name: file.name, size: file.size, type: file.ext };
  });
  console.log(mockResponse);
  if (fileList.length) {
    return new NextResponse(
      JSON.stringify({
        message: "MOCK API - SUCCESS",
        data: mockResponse,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "MOCK API - ERROR",
      result: null,
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
}
