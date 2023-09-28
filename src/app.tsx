import { FunctionComponent, memo, useMemo, useState } from "preact/compat";

// @ts-ignore
const CountryCapitalGame: FunctionComponent<{
  data: Record<string, string>;
}> = ({ data }) => {
  if (!data) return;
  const countries = Object.keys(data);
  const capital = Object.values(data);
  const [clickedItem, setClickedItems] = useState<Record<string, string>>({});
  let updatedItems = [...countries, ...capital];
  updatedItems = useMemo(
    () => updatedItems.sort(() => Math.random() - 0.5),
    []
  );
  const [showItems, setShowItems] = useState(updatedItems);
  if (countries.length === 0) return;
  console.log(countries, clickedItem);

  const onChangeButton = (element: string) => {
    if (Object.keys(clickedItem).length === 0) {
      setClickedItems({ ...clickedItem, [element]: "SELECTED" });
      return;
    } else if (Object.keys(clickedItem).length > 1) {
      setClickedItems({ [element]: "SELECTED" });
      return;
    } else if (countries.includes(element)) {
      if (clickedItem.hasOwnProperty(data[element])) {
        setClickedItems({ ...clickedItem, [element]: "SELECTED" });
      } else {
        const storedKey = Object.keys(clickedItem);
        // @ts-ignore
        setClickedItems({ [element]: "WRONG", [storedKey]: "WRONG"} );
        return;
      }

      console.log("foundCountry", element);
    } else if (capital.includes(element)) {
      let foundCountry;
      for (const key in data) {
        if (data[key] === element) {
          foundCountry = key;
          break;
        }
      }
      if (foundCountry && clickedItem[foundCountry] === "SELECTED") {
        setClickedItems({ ...clickedItem, [element]: "SELECTED" });
      } else {
        const storedKey = Object.keys(clickedItem);
        // @ts-ignore
        setClickedItems({ [element]: "WRONG", [storedKey]: "WRONG"} );
        return;
      }
    }
    const newShowItems = showItems.filter(
      (item) => clickedItem[item] !== "SELECTED" && element != item
    );
    setShowItems(newShowItems);
  };

  const handleReset = () => {
  setClickedItems({});
  setShowItems(updatedItems);
};
  return (
    <div className="flex flex-col flex-wrap gap-5 justify-around align-center">
      {showItems.length != 0 ? (
        showItems.map((e, i) => {
          return (
            <button
              onClick={() => onChangeButton(e)}
              className={`${
                clickedItem.hasOwnProperty(e) && clickedItem[e] === "SELECTED"
                  ? "bg-blue-500"
                  : clickedItem[e] === "WRONG"
                  ? "bg-red-500"
                  : "bg-grey-500"
              }  border rounded p-4`}
              key={i}
            >{`${e} `}</button>
          );
        })
      ) : (
        <p>Congrats you nailed it</p>
      )}
      <button
  onClick={handleReset}
  className="w-32 h-10 bg-blue-500 text-white mt-4"
>
  Reset
</button>
    </div>
  );
};

const App = () => {
  return (
    <>
      <div className="text-2xl text-center">Select correct pair.</div>
      <CountryCapitalGame data={{ Germany: "Berlin", India: "Delhi" }} />

      <p className="text-center pb-5">Made by Harsh with ❤️</p>
    </>
  );
};
export default memo(App);
