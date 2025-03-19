import React, { ChangeEvent, JSX, useState } from "react";

interface PercentCardType {
  cardType?: "input";
  percentage?: string;
  selected?: boolean;
  onSelect?: (percent: string) => void;
  setIsSelected?: (percent: number) => void;
  customInputChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  customInput?: string;
}

export const PercentCard = (props: PercentCardType): JSX.Element => {
  const {
    cardType,
    percentage,
    selected,
    onSelect,
    customInput,
    customInputChangeHandler,
  } = props;

  return (
    <>
      {cardType === "input" ? (
        <input
          value={customInput}
          onChange={customInputChangeHandler}
          placeholder="Custom"
          type="text"
          className="outline-0 text-right border-[2px] border-VeryLightGrayishCyan focus:border-[2px] focus:border-StrongCyan p-1 placeholder:font-[18px] w-[47%] md:w-[82px] text-VeryDarkCyan bg-VeryLightGrayishCyan text-[16px] rounded-[4px]"
        />
      ) : (
        <div
          onClick={onSelect?.bind(this, percentage || "No value")}
          className={` ${
            selected ? "bg-StrongCyan" : "bg-VeryDarkCyan"
          } active:scale-[0.9] transition-transform hover:text-VeryDarkCyan text-White flex justify-center cursor-pointer  hover:bg-LightGrayishCyan items-center w-[47%] md:w-[82px]  py-[6px] rounded-[4px]`}
        >
          <h1 className="">{percentage}</h1>
        </div>
      )}
    </>
  );
};
