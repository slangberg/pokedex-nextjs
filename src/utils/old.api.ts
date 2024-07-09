// import { fetchFromApi } from "./api";

// export const dataCrawlTwo = async (
//   source: Record<string, any>,
//   depth: number = 0,
//   maxDepth: number = 3,
//   ignoredKeys: string[] = [],
//   parentKey: string | null = null
// ): Promise<Record<string, any>> => {
//   let clone: Record<string, any> = {};

//   if (source) {
//     for (const [key, value] of Object.entries(source)) {
//       if (ignoredKeys.includes(key) || depth > maxDepth || isEmpty(value)) {
//         continue;
//       }

//       if (parentKey) {
//       }

//       // Check if the object has a name property matching the key and is at depth 1 or lower

//       if (typeof value === "string") {
//         clone[key] = value;
//       } else if (Array.isArray(value)) {
//         const langCheck = checkForLang(value);
//         if (langCheck) {
//           clone[key] = langCheck;
//         } else {
//           clone[key] = await Promise.all(
//             value.map(async (item) =>
//               typeof item === "object"
//                 ? await dataCrawlTwo(
//                     item,
//                     depth + 1,
//                     maxDepth,
//                     ignoredKeys,
//                     key
//                   )
//                 : item
//             )
//           );
//         }
//       } else if (typeof value === "object") {
//         if (value.hasOwnProperty("url") && !ignoredKeys.includes(key)) {
//           const data = await fetchFromApi({
//             url: value.url,
//             error: key,
//           });

//           const parsed = await dataCrawlTwo(
//             data,
//             depth + 1,
//             maxDepth,
//             ignoredKeys,
//             key
//           );

//           if (parentKey && parsed.hasOwnProperty(parentKey)) {
//             clone[parentKey] = parsed[parentKey];
//           } else if (parentKey) {
//             clone[parentKey] = parsed;
//           } else {
//             clone[key] = parsed;
//           }
//         }
//       } else {
//         clone[key] = value;
//       }
//     }
//   }

//   return clone;
// };

// export const getImagesFromObject = (
//   source: Record<string, any>,
//   parentKey?: string
// ): Array<Record<string, any>> => {
//   let clone: Array<Record<string, any>> = [];
//   if (source) {
//     Object.entries(source).forEach(([key, value]) => {
//       if (typeof value === "string") {
//         if (value && !key.includes(".gif")) {
//           const base = parentKey ? `${parentKey}_` : "";
//           const id = base + key;
//           const description = `${parentKey} ${key}`.replace(/_/g, " ").trim();
//           clone.push({ id, url: value, description });
//         }
//       }
//       if (typeof value === "object") {
//         const deep = getImagesFromObject(value, key);
//         clone = [...clone, ...deep];
//       }
//     });
//   }

//   return clone;
// };
// function checkForLang(value: any[]) {
//   throw new Error("Function not implemented.");
// }
