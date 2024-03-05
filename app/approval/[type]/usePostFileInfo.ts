"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const url = process.env.NODE_ENV === "test" ? "/api" : "https://~~.com";

const instance = axios.create({
  baseURL: url,
});

const postFileInfo = async (data: File[]) => {
  console.log(data);
  const response = await instance.post("/posts", data);
  console.log(response);
  return response.data;
};

const usePostFileInfo = () => {
  return useMutation({
    mutationFn: (data: File[]) => {
      return postFileInfo(data);
    },
  });
};

export default usePostFileInfo;
