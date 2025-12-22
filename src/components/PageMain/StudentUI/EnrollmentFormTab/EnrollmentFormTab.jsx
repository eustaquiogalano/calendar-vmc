import React from "react";
import style from "./EnrollmentFormTab.module.css";

function EnrollmentFormTab() {
  return (
    <form action="" className={style["enrollment-form"]}>
      {/*
        personal information 
        */}
      <section
        className={`${style["enrollment-form__section"]} ${style["enrollment-form__section--personal-information"]}`}
      >
        <div className={style["enrollment-form__section-header"]}>
          <h2 className={style["enrollment-form__section-title"]}>
            Personal Information
          </h2>
        </div>

        {/* first middle last names suffix */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-one"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="first-name">First Name:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="first-name"
              id="first-name"
              required
              minLength="2"
            />
            <p></p>
          </div>
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="middle-name">Middle Name:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="middle-name"
              id="middle-name"
              minLength="2"
            />
          </div>
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="last-name">Last Name:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="last-name"
              id="last-name"
              required
              minLength="2"
            />
          </div>
          <div
            className={`${style["enrollment-form__form-field"]} ${style["enrollment-form__form-field--suffix"]} `}
          >
            <label htmlFor="suffix">Suffix:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="suffix"
              id="suffix"
            />
          </div>
        </div>

        {/* month day year sex form fields */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-two"]}`}
        >
          {/* month form field */}
          <div
            className={`${style["enrollment-form__form-field"]} ${style["enrollment-form__form-field--month"]} `}
          >
            <label htmlFor="month">Birth Month:</label>
            <select defaultValue={"Janua"} name="month" id="month">
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">Mar</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sept">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
          </div>

          {/* day and year */}
          <div className={` ${style["enrollment-form__day-year-container"]} `}>
            {/* day form field */}
            <div
              className={`${style["enrollment-form__form-field"]} ${style["enrollment-form__form-field--day"]} `}
            >
              <label htmlFor="day">Day:</label>
              <select name="day" id="day">
                <option value="" selected disabled></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
            </div>

            {/* year form field */}
            <div
              className={`${style["enrollment-form__form-field"]} ${style["enrollment-form__form-field--year"]} `}
            >
              <label htmlFor="year">Year:</label>
              <select name="year" id="year">
                <option value="" selected disabled></option>
                <option value="1970">1970</option>
                <option value="1971">1971</option>
                <option value="1972">1972</option>
                <option value="1973">1973</option>
                <option value="1974">1974</option>
                <option value="1975">1975</option>
                <option value="1976">1976</option>
                <option value="1977">1977</option>
                <option value="1978">1978</option>
                <option value="1979">1979</option>
                <option value="1980">1980</option>
                <option value="1981">1981</option>
                <option value="1982">1982</option>
                <option value="1983">1983</option>
                <option value="1984">1984</option>
                <option value="1985">1985</option>
                <option value="1986">1986</option>
                <option value="1987">1987</option>
                <option value="1988">1988</option>
                <option value="1989">1989</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>

          {/* sex form field */}
          <div
            className={`${style["enrollment-form__form-field"]} ${style["enrollment-form__form-field--sex"]} `}
          >
            <label htmlFor="sex">Sex:</label>
            <select name="sex" id="sex">
              <option value="" selected disabled></option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* address form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-three"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="address">Address:</label>
            <textarea name="address" id="address"></textarea>
          </div>
        </div>

        {/* email form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-four"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="email">E-mail Address:</label>
            <input
              className={style["enrollment-form__input"]}
              type="email"
              name="email"
              id="email"
            />
          </div>
        </div>

        {/* contact number civil status form fields */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-five"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="student-contact-number">
              Student Contact Number:
            </label>
            <input
              className={style["enrollment-form__input"]}
              type="number"
              name="student-contact-number"
              id="student-contact-number"
            />
          </div>
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="civil-status">Civil Status:</label>
            <select name="civil-status" id="civil-status">
              <option value="" selected disabled></option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>

        {/* emergency contact person contact number form fields  */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-six"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="emergency-contact-person">
              Emergency Contact Person:
            </label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="emergency-contact-person"
              id="emergency-contact-person"
            />
          </div>

          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="emergency-contact-number"> Contact Number: </label>
            <input
              className={style["enrollment-form__input"]}
              type="number"
              name="emergency-contact-number"
              id="emergency-contact-number"
            />
          </div>
        </div>
      </section>

      {/* academic information */}
      <section
        className={`${style["enrollment-form__section"]} ${style["enrollment-form__section--academic-information"]}`}
      >
        <div className={style["enrollment-form__section-header"]}>
          <h2 className={style["enrollment-form__section-title"]}>
            Academic Information
          </h2>
        </div>

        {/* student id form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-one"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="student-id">Student ID:</label>
            <input
              className={style["enrollment-form__input"]}
              type="number"
              name="student-id"
              id="student-id"
            />
          </div>
        </div>

        {/* course major form fields */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-two"]}`}
        >
          {/* course */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="course">Course:</label>
            <select name="course" id="course">
              <option value="" selected disabled></option>
              <option value="is">BSIS</option>
              <option value="crim">BS CRIM</option>
              <option value="ba">BSBA</option>
              <option value="bpa">BPA</option>
              <option value="tm">BSTM</option>
              <option value="hm">BSHM</option>
              <option value="ed">BSED</option>
              <option value="eed">BEED</option>
              <option value="eced">BECED</option>
              <option value="ned">BSNED</option>
              <option value="tcp">TCP</option>
              <option value="csned">CSNED</option>
              <option value="ceced">CECED</option>
            </select>
          </div>

          {/* major */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="major">Major (if applicable):</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="course-major"
              id="major"
            />
          </div>
        </div>

        {/* year level semester academic year form fields */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-three"]}`}
        >
          {/* year level */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="year-level">Year Level:</label>
            <select name="year-level" id="year-level">
              <option value="" selected disabled></option>
              <option value="1st">1st year</option>
              <option value="2nd">2nd year</option>
              <option value="3rd">3rd year</option>
              <option value="4th">4th year</option>
            </select>
          </div>

          {/* semester */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="semester">Semester:</label>
            <select name="semester" id="semester">
              <option value="" selected disabled></option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
            </select>
          </div>

          {/* academic year */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="academic-year">Academic Year:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="academic-year"
              id="academic-year"
              placeholder="2025-2026"
              disabled
            />
          </div>
        </div>
      </section>
      {/* previous school information */}
      <section
        className={`${style["enrollment-form__section"]} ${style["enrollment-form__section--previous-school-information"]}`}
      >
        <div className={style["enrollment-form__section-header"]}>
          <h2 className={style["enrollment-form__section-title"]}>
            Previous School Information (For Freshmen/Transferee)
          </h2>
        </div>

        {/* previous school attended form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-one"]}`}
        >
          {/* previous shool attended */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="last-school">Previous School Attended:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="last-school"
              id="last-school"
            />
          </div>
        </div>

        {/* academic level / last year attended */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-two"]}`}
        >
          {/* academic level */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="academic-level">Academic Level:</label>
            <select name="academic-level" id="academic-level">
              <option value="" selected disabled></option>
              <option value="shs">Sr. High School</option>
              <option value="college">College</option>
              <option value="hs">High School</option>
            </select>
          </div>

          {/* last year attended */}
          <div
            className={`${style["enrollment-form__form-field"]} ${style["enrollment-form__form-field--last-year-attended-container"]} `}
          >
            <label htmlFor="last-year-attended">
              Last Year Attended/Graduated:
            </label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="last-year-attended"
              id="last-year-attended"
              placeholder="20190-2020"
            />
          </div>
        </div>

        {/* strand form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-three"]}`}
        >
          {/* strand */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="strand-course">Strand/Course:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="strand-course"
              id="strand-course"
              placeholder="Sheilded Matel Arc Welding / Information Technology"
            />
          </div>
        </div>
      </section>
      {/* guardian information */}
      <section
        className={`${style["enrollment-form__section"]} ${style["enrollment-form__section--guardian-information"]}`}
      >
        <div className={style["enrollment-form__section-header"]}>
          <h2 className={style["enrollment-form__section-title"]}>
            Parent/Guardian Information
          </h2>
        </div>

        {/* fathers name form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-one"]}`}
        >
          {/* fathers name */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="fathers-name">Father's Name:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="fathers-name"
              id="fathers-name"
            />
          </div>
        </div>

        {/* contact number / occupation form fields*/}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-two"]}`}
        >
          {/* contact number */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="fathers-contact-number">Contact Number:</label>
            <input
              className={style["enrollment-form__input"]}
              type="number"
              name="fathers-contact-number"
              id="fathers-contact-number"
            />
          </div>

          {/* occupation */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="fathers-occupation">Occupation:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="fathers-occupation"
              id="fathers-occupation"
            />
          </div>
        </div>

        {/* mothers name form field */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-three"]}`}
        >
          {/* mothers name */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="mothers-name">Mother's Name:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="mothers-name"
              id="mothers-name"
            />
          </div>
        </div>

        {/* contact number / occupation form fields */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-four"]}`}
        >
          {/* contact number */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="mothers-contact-number">Contact Number:</label>
            <input
              className={style["enrollment-form__input"]}
              type="number"
              name="mothers-contact-number"
              id="mothers-contact-number"
            />
          </div>

          {/* occupation */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="mothers-occupation">Occupation:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="mothers-occupation"
              id="mothers-occupation"
            />
          </div>
        </div>

        {/* guardian parents form field*/}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-five"]}`}
        >
          <div
            className={`${style["enrollment-form__form-field"]}  ${style["enrollment-form__form-field--checkbox-container"]} `}
          >
            <input
              className={`${style["enrollment-form__input"]} ${style["enrollment-form__input--guardian-same"]}`}
              type="checkbox"
              id="guardian-same"
            />
            <label htmlFor="guardian-same">
              <span className={style["enrollment-form__decoy-checkbox"]}></span>{" "}
              Guardian same as parents
            </label>
          </div>
        </div>

        {/* guardians name / contact number form fields*/}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-six"]}`}
        >
          {/* guardians name */}
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="guardian-name">Guardian's Name:</label>
            <input
              className={style["enrollment-form__input"]}
              type="text"
              name="guardian-name"
              id="guardian-name"
            />
          </div>

          {/* contact number */}
          <div className={style["enrollment-form__form-field"]}>
            <label htmlFor="guardian-contact-number">Contact Number:</label>
            <input
              className={style["enrollment-form__input"]}
              type="number"
              name="guardian-contact-number"
              id="guardian-contact-number"
            />
          </div>
        </div>
      </section>
      {/* requirements */}
      <section
        className={`${style["enrollment-form__section"]} ${style["enrollment-form__section--requirements"]}`}
      >
        <div className={style["enrollment-form__section-header"]}>
          <h2 className={style["enrollment-form__section-title"]}>
            Requirements Upload
          </h2>
        </div>

        {/* note */}
        <div className={`${style["enrollment-form__note-container"]}`}>
          <p>Note:</p>
          <ul>
            <li>
              You can choose to follow-up your files personally at school.
            </li>
            <li>Accepted formats include .pdf, .jpg, .png.</li>
            <li>Make sure to upload high quality images.</li>
          </ul>
        </div>

        {/* report card */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-one"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="form-138">Form 138 / Report Card:</label>
            <input
              className={style["enrollment-form__input"]}
              type="file"
              name="form-138"
              id="form-138"
            />
          </div>
        </div>

        {/* good moral */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-two"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="good-moral">Certificate of Good Moral:</label>
            <input
              className={style["enrollment-form__input"]}
              type="file"
              name="good-moral"
              id="good-moral"
            />
          </div>
        </div>

        {/* birth certificate */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-three"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="birth-certificate">PSA Birth Certificate:</label>
            <input
              className={style["enrollment-form__input"]}
              type="file"
              name="birth-certificate"
              id="birth-certificate"
            />
          </div>
        </div>

        {/* 2x2 photo */}
        <div
          className={`${style["enrollment-form__section-body"]} ${style["enrollment-form__section-body--row-four"]}`}
        >
          <div className={`${style["enrollment-form__form-field"]} `}>
            <label htmlFor="student-photo">2x2 Photo:</label>
            <input
              className={style["enrollment-form__input"]}
              type="file"
              name="student-photo"
              id="student-photo"
            />
          </div>
        </div>
      </section>
      <section
        className={`${style["enrollment-form__section"]} ${style["enrollment-form__section--submit"]}`}
      >
        <div className={`${style["enrollment-form__button-container"]} `}>
          <button className={`${style["enrollment-form__button--submit"]} `}>
            Submit Enrollment Form
          </button>
        </div>
      </section>
    </form>
  );
}

export default EnrollmentFormTab;
