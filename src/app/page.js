"use client";
import { useState } from "react";

export default function RegisFormPage() {
  const [fstname, setFstname] = useState("");
  const [fstnameError, setFstnameError] = useState(false);
  const [lstname, setLstname] = useState("");
  const [lstnameError, setLstnameError] = useState(false);
  const [plan, setPlan] = useState("");
  const [planError, setPlanError] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderError, setGenderError] = useState(false);
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);
  const [isUserAgreed, setUserAgreed] = useState(false);

  const inputFnameOnChange = (event) => {
    setFstnameError(false);
    setFstname(event.target.value);
  };

  const inputLnameOnChange = (event) => {
    setLstnameError(false);
    setLstname(event.target.value);
  };

  const selectPlanOnChange = (event) => {
    setPlanError(false);
    setPlan(event.target.value);
  };

  const radioGenderMaleOnChange = () => {
    setGenderError(false);
    setGender("male");
  };

  const radioGenderFemaleOnChange = () => {
    setGenderError(false);
    setGender("female");
  };

  const cbBuyBottleOnChange = (event) => {
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event) => {
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event) => {
    setBuyCap(event.target.checked);
  };

  function computeTotalPayment() {
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;
    if (buyBottle) total += 200;
    if (buyShoes) total += 600;
    if (buyCap) total += 400;
    if (buyBottle && buyShoes && buyCap) total *= 0.8;

    return total;
  }

  const registerBtnOnClick = () => {
    let fnameOk = true;
    let lnameOk = true;
    let planOk = true;
    let genderOk = true;

    if (fstname === "") {
      fnameOk = false;
      setFstnameError(true);
    }

    if (lstname === "") {
      lnameOk = false;
      setLstnameError(true);
    }

    if (plan === "") {
      planOk = false;
      setPlanError(true);
    }

    if (gender === null) {
      genderOk = false;
      setGenderError(true);
    }

    if (fnameOk && lnameOk && planOk && genderOk) {
      alert(
        `Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
      );
    }
  };

  const userAgreedOnClick = (event) => {
    setUserAgreed(event.target.checked);
  };

  return (
    <div className="mx-auto vstack gap-3" style={{ width: "400px" }}>
      <h3 className="text-center fst-italic">Register CMU Marathon 🏃‍♂️</h3>
      {/* First name & Last name */}
      <div className="d-flex gap-2">
        <div>
          <label className="form-label">First name</label>
          <input
            className={"form-control" + (fstnameError ? " is-invalid" : "")}
            onChange={inputFnameOnChange}
            value={fstname}
          />
          <div className="invalid-feedback">Invalid first name</div>
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input
            className={"form-control" + (lstnameError ? " is-invalid" : "")}
            onChange={inputLnameOnChange}
            value={lstname}
          />
          <div className="invalid-feedback">Invalid last name</div>
        </div>
      </div>

      {/* Running Plan */}
      <div>
        <label className="form-label">Plan</label>
        <select
          className={"form-select" + (planError ? " is-invalid" : "")}
          onChange={selectPlanOnChange}
          value={plan}
        >
          <option value="">Please select..</option>
          <option value="funrun">Fun run 5.5 Km (500 THB)</option>
          <option value="mini">Mini Marathon 10 Km (800 THB)</option>
          <option value="half">Half Marathon 21 Km (1,200 THB)</option>
          <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
        </select>
        <div className="invalid-feedback">Please select a Plan</div>
      </div>

      {/* Gender */}
      <div>
        <label className="form-label">Gender</label>
        <div>
          <input
            className="me-2 form-check-input"
            type="radio"
            onChange={radioGenderMaleOnChange}
            checked={gender === "male"}
          />
          Male 👨
          <input
            className="mx-2 form-check-input"
            type="radio"
            onChange={radioGenderFemaleOnChange}
            checked={gender === "female"}
          />
          Female 👩
          {genderError ? (
            <div className="text-danger">Please select gender</div>
          ) : (
            <></>
          )}
          {/* To show error when user did not select gender, */}
          {/* We just have to render the div below (Not using is-invalid bootstrap class) */}
          {/* <div className="text-danger">Please select gender</div> */}
        </div>
      </div>

      {/* Extra Items */}
      <div>
        <label className="form-label">Extra Item(s)</label>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyBottleOnChange}
            checked={buyBottle}
          />{" "}
          <label className="form-check-label">Bottle 🍼 (200 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyShoesOnChange}
            checked={buyShoes}
          />{" "}
          <label className="form-check-label">Shoes 👟 (600 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyCapOnChange}
            checked={buyCap}
          />{" "}
          <label className="form-check-label">Cap 🧢 (400 THB)</label>
        </div>
      </div>

      <div className="alert alert-primary" role="alert">
        Promotion📢 Buy all items to get 20% Discount
      </div>

      {/* Total Payment */}
      <div>
        Total Payment : {computeTotalPayment().toLocaleString()} THB
        {buyBottle && buyShoes && buyCap ? (
          <span className="text-success d-block">(20% Discounted)</span>
        ) : (
          ""
        )}
        {/* Render below element conditionally when user get 20% discount */}
        {/* <span className="text-success d-block">(20% Discounted)</span> */}
      </div>

      {/* Terms and conditions */}
      <div>
        <input className="me-2" type="checkbox" onClick={userAgreedOnClick} />I
        agree to the terms and conditions
      </div>

      {/* Register Button */}
      <button
        className={"btn btn-success my-2" + (isUserAgreed ? "" : " disabled")}
        onClick={registerBtnOnClick}
        
      >
        Register
      </button>
    </div>
  );
}