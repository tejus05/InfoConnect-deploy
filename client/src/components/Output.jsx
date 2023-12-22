import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser"; // Import html-react-parser
import { setSelectOption, setLanguageOption } from "../store/slices/combinedSlice";

function Output({ target, hidden }) {
  const {
    homeObject,
    documentObject,
    processObject,
    feesObject,
    handbookObject,
    loading,
    feedback
  } = useSelector((state) => state.combinedReducer);

  const dispatch = useDispatch();

  let selectedObject = [];

  // Determine the selected object based on the target prop
  switch (target) {
    case "Home":
      selectedObject = homeObject;
      break;
    case "Documents":
      selectedObject = documentObject;
      break;
    case "Process":
      selectedObject = processObject;
      break;
    case "Fees":
      selectedObject = feesObject;
      break;
    case "Handbook":
      selectedObject = handbookObject;
      break;
    case "Feedback":
      selectedObject = feedback;
      break;
    default:
      selectedObject = [];
      break;
  }

  const showInfo = (e) => {
    dispatch(setSelectOption(e.target.value));
  };
  const showLanguage = (e) => {
    dispatch(setLanguageOption(e.target.value));
  };

  return loading ? (
    <div className="bg-blue-100 p-8 text-center flex flex-col gap-10 justify-center items-center">
      <h2 className="text-[33px] font-bold mb-4">Loading...</h2>
      <img
        src="https://renflower.lt/img/loading-gif-transparent-background-free-download-4.jpg"
        alt="loading-gif"
        className="h-[200px] bg-transparent"
      />
    </div>
  ) : selectedObject.length > 1 ? (
    selectedObject.slice(1).map((res, index) => (
      <div
        key={index}
        className="mt-7 w-full flex justify-center overflow-auto"
      >
        <div className="max-w-[330px] lg:max-w-4xl md:max-w-xl w-full border-gray-500 border-4 border-divp-4 px-7 bg-black/5 py-3 overflow-auto rounded-3xl">
          <p className="text-gray-700 italic font-bold pb-2">Q. {res.input}</p>
          {/* Use html-react-parser to render HTML content */}
          <div>{HTMLReactParser(res.output)}</div>
        </div>
      </div>
    ))
  ) : (
    <div className="bg-blue-100 p-8 text-center" hidden={hidden}>
      <h2 className="text-[33px] font-bold mb-4">Select a service</h2>
      <select
        id="services"
        onChange={showInfo}
        className="text-[16px] px-4 py-2 mb-8 rounded-full bg-white outline-none max-w-[300px] w-full"
      >
        <option className="text-black" value="">
          <>Select a service</>
        </option>
        <option value="Passport">Passport</option>
        <option value="VISA">VISA</option>
        <option value="Aadhar Card">Aadhar Card</option>
        <option value="PAN Card">PAN Card</option>
        <option value="Voter ID">Voter ID</option>
        <option value="Education Loan">Education Loan</option>
        <option value="Business License">Business License</option>
        <option value="Ration Card">Ration Card</option>
        <option value="Driver's License">Driver's License</option>
      </select>
      <h2 className="text-[33px] font-bold mb-4">Select a language </h2>
      <select
        id="languages"
        onChange={showLanguage}
        className="text-[16px] px-4 py-2 mb-8 rounded-full bg-white outline-none max-w-[320px] w-full"
      >
        <option className="text-black" value="">
          <>Select a language (optional)</>
        </option>
        <option value="Kannada">Kannada</option>
        <option value="Hindi">Hindi</option>
        <option value="Tamil">Tamil</option>
        <option value="Telugu">Telugu</option>
        <option value="Bengali">Bengali</option>
        <option value="Punjabi">Punjabi</option>
        <option value="Marathi">Marathi</option>
        <option value="Malayalam">Malayalam</option>
      </select>
    </div>
  );
}

export default Output;