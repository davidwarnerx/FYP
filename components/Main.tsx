"use client";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import iconDollar from "../public/images/icon-dollar.svg";
import iconPerson from "../public/images/icon-person.svg";
import { PercentCard } from "./PercentCard";

const Main = () => {
  const [billAmountInput, setBillAmountInput] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [peopleInput, setPeopleInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [peopleInputFocused, setPeopleInputFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(0);
  const [customInput, setCustomInput] = useState("");

  const [peopleInputError, setPeopleInputError] = useState(false);

  const amountInputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!isNaN(+e.target.value)) setBillAmountInput(e.target.value);
    const billAmount = +e.target.value;
    calculateTip(isSelected, billAmount, +peopleInput);
  };

  const peopleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) setPeopleInput(e.target.value);
    const peopleInput = +e.target.value;
    if (peopleInput <= 0) {
      setPeopleInputError(true);
    } else {
      calculateTip(isSelected, +billAmountInput, peopleInput);
      setPeopleInputError(false);
    }
  };

  const selectPercentageHandler = (percent: string): void => {
    const formatedPercent: number = Number(percent.replaceAll("%", ""));
    setIsSelected(formatedPercent);
    calculateTip(formatedPercent, +billAmountInput, +peopleInput);
  };

  const customInputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const enteredText = e.target.value;
    if (!isNaN(+enteredText)) setCustomInput(enteredText);
    setIsSelected(+enteredText);
    calculateTip(+enteredText, +billAmountInput, +peopleInput);
  };

  const calculateTip = (
    percent: number,
    bill: number,
    people: number
  ): void => {
    if (people <= 0) {
      setPeopleInputError(true);
    } else {
      const percentageAmount = (percent / 100) * bill;
      const calcTotalPerPerson = (percentageAmount + bill) / people;
      const calcTotalTip = percentageAmount / people;
      setTipAmount(calcTotalTip);
      setTotalAmount(calcTotalPerPerson);
      setPeopleInputError(false);
    }
  };

  const resetHandler = () => {
    setBillAmountInput("");
    setTipAmount(0);
    setTotalAmount(0);
    setCustomInput("");
    setPeopleInput("");
    setPeopleInputError(false);
    setIsSelected(0);
  };

  return (
    <main className="bg-LightGrayishCyan  h-full min-h-screen flex justify-center items-center flex-col gap-10 py-10 ">
      <div>
        <h1 className="text-GrayishCyan">SPLI</h1>
        <h1 className="text-GrayishCyan">TTER</h1>
      </div>

      <section className="bg-White w-[650px] max-w-[85%] flex flex-col md:flex-row md:gap-6  justify-between p-5 gap-20 rounded-[15px]">
        <div className="h-[280px] w-full bg-White p-2 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-GrayishCyan">Bill</h1>
            <div
              className={`flex items-center w-[96.5%] rounded-md bg-VeryLightGrayishCyan px-3 ${
                isInputFocused
                  ? "border-[2px] border-StrongCyan"
                  : "border-[2px] border-VeryLightGrayishCyan"
              }  `}
            >
              <Image alt="dollar" src={iconDollar} />
              <input
                inputMode="numeric"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={billAmountInput}
                onChange={amountInputChangeHandler}
                className="outline-0 text-right w-[100%] text-VeryDarkCyan bg-VeryLightGrayishCyan text-[24px] "
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-GrayishCyan">Select Tip %</h1>
            <div className="flex gap-3 flex-wrap">
              <PercentCard
                percentage="5%"
                onSelect={selectPercentageHandler}
                selected={isSelected === 5}
              />
              <PercentCard
                percentage="10%"
                onSelect={selectPercentageHandler}
                selected={isSelected === 10}
              />
              <PercentCard
                percentage="15%"
                onSelect={selectPercentageHandler}
                selected={isSelected === 15}
              />
              <PercentCard
                percentage="20%"
                onSelect={selectPercentageHandler}
                selected={isSelected === 20}
              />
              <PercentCard
                percentage="50%"
                onSelect={selectPercentageHandler}
                selected={isSelected === 50}
              />
              <PercentCard
                customInputChangeHandler={customInputChangeHandler}
                customInput={customInput}
                setIsSelected={setIsSelected}
                cardType="input"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between px-3">
              <h1 className="text-[12px] text-GrayishCyan">Number of People</h1>
              {peopleInputError && (
                <h1 className="text-[12px] text-red-400">Can&apos;t be 0 </h1>
              )}
            </div>

            <div
              className={`flex items-center w-[96.5%] ${
                peopleInputError ? "border-red-400" : ""
              } rounded-md bg-VeryLightGrayishCyan px-3 ${
                peopleInputFocused
                  ? "border-[2px] border-StrongCyan"
                  : "border-[2px] border-VeryLightGrayishCyan"
              }  `}
            >
              <Image alt="dollar" src={iconPerson} />
              <input
                inputMode="numeric"
                onFocus={() => setPeopleInputFocused(true)}
                onBlur={() => setPeopleInputFocused(false)}
                value={peopleInput}
                onChange={peopleInputChangeHandler}
                className={
                  "outline-0 text-right w-[100%] text-VeryDarkCyan bg-VeryLightGrayishCyan text-[24px] "
                }
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full bg-VeryDarkCyan rounded-[10px] px-5 pb-6 pt-10 flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-white text-[13px]">Tip Amount</h1>
                <h1 className="text-GrayishCyan text-[11px]">/ Person</h1>
              </div>
              <div className="text-StrongCyan text-[30px]">
                ${tipAmount.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-white text-[13px]">Total</h1>
                <h1 className="text-GrayishCyan text-[11px]">/ Person</h1>
              </div>
              <div className="text-StrongCyan text-[30px]">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetHandler}
              className="bg-StrongCyan w-[100%] py-1 hover:bg-LightGrayishCyan active:scale-[0.9] transition-transform rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
