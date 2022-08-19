import type { NextApiRequest, NextApiResponse } from "next";

const store: Record<string, [boolean, boolean, boolean, boolean]> = {};

const generateStoreKey = (): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  if (!store[result]) {
    return result;
  }
  return generateStoreKey();
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { key } = req.query;
  if (req.method === "GET") {
    if (key === "all") {
      res.status(200).json(store);
    } else {
      const item: [boolean, boolean, boolean, boolean] | undefined =
        store[key as string];
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).end();
      }
    }
  }

  if (req.method === "POST") {
    const newKey = generateStoreKey();
    store[newKey] = [false, false, false, false];
    res.status(200).json(newKey);
  }

  if (req.method === "PUT") {
    const item: [boolean, boolean, boolean, boolean] | undefined =
      store[key as string];
    if (item) {
      const data: [boolean, boolean, boolean, boolean] = req.body.spots;
      store[key as string] = data;
      res.status(200).json(data);
    } else {
      res.status(404).end();
    }
  }
};
