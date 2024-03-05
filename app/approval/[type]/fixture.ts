export const generateMockFile = (name: string, size: number) => {
  const file = new File([""], name);
  Object.defineProperty(file, "size", { value: size });
  return file;
};

export const mockFileData = [
  {
    id: "1",
    name: "1st.png",
    size: 1000,
    ext: "png",
  },
  {
    id: "2",
    name: "2nd.png",
    size: 1000,
    ext: "png",
  },
  {
    id: "3",
    name: "3rd.png",
    size: 1000,
    ext: "png",
  },
];

export const mockBigSizeFileData = [
  {
    id: "1",
    name: "1st.png",
    size: 1024 * 1024 * 20,
    ext: "png",
  },
  {
    id: "2",
    name: "2nd.png",
    size: 1024 * 1024 * 20,
    ext: "png",
  },
  {
    id: "3",
    name: "3rd.png",
    size: 1024 * 1024 * 20,
    ext: "png",
  },
];

export const mockFiles = mockFileData.map(({ name, size }) =>
  generateMockFile(name, size)
);

export const mockBigSizeFiles = mockBigSizeFileData.map(({ name, size }) =>
  generateMockFile(name, size)
);

export const mockFile = generateMockFile("1st.png", 1000);

export const mockBigSizeFile = generateMockFile(
  "big_size.png",
  1024 * 1024 * 100
);
