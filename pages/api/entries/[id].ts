import type { NextApiRequest, NextApiResponse } from "next";
// import { db } from "../../../database";
// import { Entry } from "../../../interfaces/entry";
// import { EntryModel } from "../../../models";

// type Data = { message: string } | Entry;

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   switch (req.method) {
//     case "PUT":
//       return updateEntry(req, res);

//     case "GET":
//       return getEntry(req, res);

//     default:
//       return res
//         .status(400)
//         .json({ message: req.method + "は許可されていないメソッドです" });
//   }
// }

// const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   const { id } = req.query;

//   await db.connect();
//   const entryInDB = await EntryModel.findById(id);
//   await db.disconnect();

//   if (!entryInDB) {
//     return res.status(400).json({ message: "存在しないIDです　ID: " + id });
//   }

//   return res.status(200).json(entryInDB);
// };

// const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   const { id } = req.query;

//   await db.connect();

//   const entryToUpdate = await EntryModel.findById(id);

//   if (!entryToUpdate) {
//     await db.disconnect();
//     return res.status(400).json({ message: "存在しないIDです　ID: " + id });
//   }

//   const {
//     description = entryToUpdate.description,
//     status = entryToUpdate.status,
//   } = req.body;

//   try {
//     // const updatedEntry = await EntryModel.findByIdAndUpdate(
//     //   id,
//     //   { description, status },
//     //   { runValidators: true, new: true }
//     // );
//     entryToUpdate.description = description;
//     entryToUpdate.status = status;
//     const updatedEntry = await entryToUpdate.save();

//     await db.disconnect();

//     res.status(200).json(updatedEntry!);
//   } catch (error: any) {
//     await db.disconnect();

//     res.status(400).json({ message: error.errors.status.message });
//   }
// };
