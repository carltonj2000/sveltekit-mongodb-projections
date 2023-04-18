import type { Collection } from 'mongodb';

export const returnURLsList = async (collection: Collection) => {
  let firstTime = Date.now();
  const urlList = await collection.find().toArray();
  let secondTime = Date.now();

  console.log('1st Find Time', secondTime - firstTime);

  const projections = { URL: 1, _id: 0 };
  firstTime = Date.now();
  const urlList2 = await collection.find().project(projections).toArray();
  secondTime = Date.now();

  console.log('2nd Find Time', secondTime - firstTime);

  const serializedUrls = urlList.map((item) =>
    JSON.parse(
      JSON.stringify(item, (key, value) =>
        key === '_id' ? value.toString(value) : value
      )
    )
  );

  console.log(serializedUrls);
  return serializedUrls;
};
