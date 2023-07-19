import React, { useState, useEffect, useMemo  } from "react";
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { message, Popconfirm } from 'antd';
import { Select, Dropdown, Menu, Input, DatePicker, Button, Radio, Space  } from 'antd';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./resume.css";
import "quill/dist/quill.snow.css";
import avatar from "../../assets/avatar.png";

import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import Navbar from "../navbar/Navbar";

const { TextArea } = Input;

const baseURL = "http://localhost:3001/api/v1";
const getItem =  sessionStorage.getItem("userId");


const year_options = [];
const currentYear = new Date().getFullYear();
for (let i = 0; i < 50; i++) {
  const year = currentYear - i;
  year_options.push({
    value:  year,
    label:  year,
  })
  // Perform any desired operations with the year
}
// for (let year = 2023; year >= 1950; year--) {
//   year_options.push({
//     value:  year,
//     label:  year,
//   })

// }

const opportunity_options = [
  {
    value: 0,
    label: "Yes",
  },
  {
    value: 1,
    label: "No",
  },
]

const employment_type_options = [
  {
    value: 1,
    label: 'Permanant',
  },
  {
    value: 6,
    label: 'Contract',
  },
  {
    value: 7,
    label: 'Freelance',
  },
]

const month_options = [
  {
    value:  0,
    label:  'January',
  },
  {
    value:  1,
    label:  'February',
  },
  {
    value:  2,
    label:  'March',
  },
  {
    value:  3,
    label:  'April',
  },
  {
    value:  4,
    label:  'May',
  },
  {
    value:  5,
    label:  'June',
  },
  {
    value:  6,
    label:  'July',
  },
  {
    value:  7,
    label:  'August',
  },
  {
    value:  8,
    label:  'September',
  },
  {
    value:  9,
    label:  'October',
  },
  {
    value:  10,
    label:  'November',
  },
  {
    value:  11,
    label:  'December',
  },

]

const gender_options = [
  {
    value: 0,
    label: "Male",
  },
  {
    value: 1,
    label: "Female",
  },
  {
    value: 2,
    label: "Other",
  },
]

const Project_options = [
  {
    value:  'College',
    label:  'College',
  },
  {
    value:  'Company',
    label:  'Company',
  },
  {
    value:  'Training Institute',
    label:  'Training Institute',
  },
  {
    value:  'Corporate',
    label:  'Corporate',
  },
  {
    value:  'Freelancer',
    label:  'Freelancer',
  },
  {
    value:  'Cap stone',
    label:  'Cap stone',
  },
]


const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};


function ResumeBuilder() {
  // Define state variables to hold the resume data
  const [jobtitle, setJobtitle] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [ctc, setCtc] = useState("");
  const [ectc, setEctc] = useState("");
  const [state, setState] = useState("");
  const [opportunity, setOpportunity] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState(101);
  const [city, setCity] = useState("");
  const [year_experience, setYear_experience] = useState("");
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [address, setAddress] = useState("");
  const [pob, setPob] = useState("");
  const [dob, setDob] = useState("");
  const [pincode, setPincode] = useState("");
  const [nationality, setNationality] = useState("");
  const [experience, setExperience] = useState([]);
  const [educations, setEducations] = useState("");
  const [courses, setCourses] = useState('');
  const [certification, setCertification] = useState('');
  const [projects, setProjects] = useState('');
  const [skills, setSkills] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [languages, setLanguages] = useState('');
  const [profile_title, setProfile_title] = useState("");
  const [ notice_period, setNotice_period] = useState("");
  const [nationalityArray, setNationalityArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [is_experience, setIs_experience] = useState(0);
  const [experience_summary, setExperience_Summary] = useState("");
  const [phonecodeArray, setPhonecodeArray] = useState([]);
  const [country_code, setCountry_code] = useState('+91');
  const [responseData,  setResponseData] = useState('')
  const [spinLoading, setSpinLoading] = useState(false);




  //***************  Employment states **************

  const [selectedCompanyItem, setSelectedCompanyItem] = useState(null);
  const [showCompanyMessage, setShowCompanyMessage] = useState(false);
  const [selectedDesignationItem, setSelectedDesignationItem] = useState(null);
  const [showDesignationMessage, setShowDesignationMessage] = useState(false);
  const [isChecked, setIschecked] = useState(0);
  const [showEmployment, setShowEmployment] = useState(-1); // initialize state with -1
  const [employment, setEmployment] = useState([]);
  const [companyArray, setCompanyArray] = useState([]);
  const [designationArray, setDesignationArray] = useState([]);
  const [dummyjob, setDummyjob] = useState('');
  const [quillSet ,setQuillSet] = useState('')
  const [userInfo, setuserInfo] = useState({
    title: "",
    description: "",
    information: "",
  });

  //***************  Education states **************

  const [isChecked_edu, setIschecked_edu] = useState(false);
  const [showEmployment_edu, setShowEmployment_edu] = useState(-1); // initialize state with -1
  const [employment_edu, setEmployment_edu] = useState([]);
  const [nationalityArray_edu, setNationalityArray_edu] = useState([]);
  const [stateArray_edu, setStateArray_edu] = useState([]);
  const [country_edu, setCountry_edu] = useState('');
  const [specializationArray_edu, setSpecializationArray_edu] = useState([]);
  const [showSpecializationMessage_edu, setShowSpecializationMessage_edu] = useState(false);
  const [selectedSpecializationItem_edu, setSelectedSpecializationItem_edu] = useState(null);
  const [collegeArray_edu, setCollegeArray_edu] = useState([]);
  const [showCollegeMessage_edu, setShowCollegeMessage_edu] = useState(false);
  const [selectedCollegeItem_edu, setSelectedCollegeItem_edu] = useState(null);
  const [userInfo_edu, setuserInfo_edu] = useState({
    title: "",
    description: "",
    information: "",
  });

  // *******************  Certification States ******************

  const [selectedVendorItem_certi, setSelectedVendorItem_certi] = useState(null);
  const [showVendorMessage_certi, setShowVendorMessage_certi] = useState(false);
  const [selectedTechnologyItem_certi, setSelectedTechnologyItem_certi] = useState(null);
  const [showTechnologyMessage_certi, setShowTechnologyMessage_certi] = useState(false);
  const [isChecked_certi, setIschecked_certi] = useState(false);
  const [showEmployment_certi, setShowEmployment_certi] = useState(-1); // initialize state with -1
  const [employment_certi, setEmployment_certi] = useState([]);
  const [vendorArray_certi, setVendorArray_certi] = useState([]);
  const [technologyArray_certi, setTechnologyArray_certi] = useState([]);
  const [selectedVendorValueDD, setSelectedVendorValueDD] = useState('')
  const [userInfo_certi, setuserInfo_certi] = useState({
    title: "",
    description: "",
    information: "",
  });


  
  // *******************  Course States ******************
  const [selectedVendorItem_course, setSelectedVendorItem_course] = useState(null);
  const [showVendorMessage_course, setShowVendorMessage_course] = useState(false);
  const [selectedTechnologyItem_course, setSelectedTechnologyItem_course] = useState(null);
  const [showTechnologyMessage_course, setShowTechnologyMessage_course] = useState(false);
  const [isChecked_course, setIschecked_course] = useState(false);
  const [showEmployment_course, setShowEmployment_course] = useState(-1); // initialize state with -1
  const [employment_course, setEmployment_course] = useState([]);
  const [vendorArray_course, setVendorArray_course] = useState([]);
  const [technologyArray_course, setTechnologyArray_course] = useState([]);
  const [userInfo_course, setuserInfo_course] = useState({
    title: "",
    description: "",
    information: "",
  });
  
  // *******************  Project States ******************

  const [isChecked_pro, setIschecked_pro] = useState(false);
  const [showEmployment_pro, setShowEmployment_pro] = useState(-1); // initialize state with -1
  const [employment_pro, setEmployment_pro] = useState([]);
  const [userInfo_pro, setuserInfo_pro] = useState({
    title: "",
    description: "",
    information: "",
  });
  
  // *******************  Hobbies States ******************
  const [vendorArray_hob, setVendorArray_hob] = useState([]);
  const [hobbies_hob, setHobbies_hob] = useState([])
  
  // *******************  Skills States ******************
  const [vendorArray_skill, setVendorArray_skill] = useState([]);
  const [skills_skill, setSkills_skill] = useState([])
  
  // *******************  Languages States ******************
    const [vendorArray_lang, setVendorArray_lang,] = useState([]);
    const [languages_lang, setLanguages_lang,] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
       
        getApiCall()
      } catch (error) {
        // Handle any errors
      }
    };

 
    fetchData();
  }, []);

 const getApiCall = async () => {
  let countryArray = [];
  let phonecodeTArray = [];
  const response = await axios.get(`${baseURL}/countries`);
  // console.log(response.data.data, "res");
   for (let i = 0; i < response.data.data.length; i++) {
     let countryList = {
       value: response.data.data[i].id,
       label: response.data.data[i].name,
     };
     let phonecodeList = {
       value: response.data.data[i].id,
       label:'+'+response.data.data[i].phonecode,
     }
     countryArray.push(countryList);
     phonecodeTArray.push(phonecodeList);
   }
   setNationalityArray(countryArray);

  let getData = await axios.get(`${baseURL}/profileupdate/${getItem}`);
  setResponseData(getData.data)
//  console.log(getData.data, "RESPONSE DATA 1234567890")
  // Employment API Response

  if(getData.data.data.experience){
    let summary_array = []
    let exp_array = getData.data.data.experience;
    let employment_array = []
   // console.log(exp_array, "exp_array 1234567890")
    exp_array.map((obj, index) => {    
      let exp_obj = {
         current_company: obj.currentCompany,
         currently_working: parseInt(obj.currently_working),
         job_designation: obj.Designation,
         employment_type: parseInt(obj.employment_type, 10),
         start_month: parseInt(obj.start_month, 10),
         start_year: obj.start_year,
         end_month: parseInt(obj.end_month, 10),
         end_year: obj.end_year,
         job_summary: obj.job_summary,
         job_accomplishments: obj.job_accomplishments,
       }

       employment_array.push(exp_obj)
       summary_array.push(obj.job_summary)
    })
    setEmployment(employment_array)
    setuserInfo(summary_array)

 }

 //Education Api Response


 if (getData.data.data.educations) {
  let exp_array = getData.data.data.educations;
  let employment_array = [];
  let countryArray_edu = []
  const response_edu = await axios.get(`${baseURL}/primary_qualification`)
  for (let i=0; i<response_edu.data.data.length; i++){
    let countryList =  {
      value: response_edu.data.data[i].id,
      label: response_edu.data.data[i].english,
    }
    countryArray_edu.push(countryList)
  }
  setNationalityArray_edu(countryArray_edu)

  await Promise.all(
    exp_array.map(async (obj, index) => {
      let stateTArray = [];
      const response = await axios.get(`${baseURL}/secondary_qualification?id=${obj.primary_qualification_id}`);
      console.log(response.data.data, "response.data.data");

      for (let i = 0; i < response.data.data.length; i++) {
        let stateList = {
          value: response.data.data[i].id,
          label: response.data.data[i].english,
        };
        stateTArray.push(stateList);
      }

      let exp_obj = {
        primary_qualification: obj.primary_qualification_id,
        degree: stateTArray,
        secondary_qualification: obj.secondary_qualification_id,
        specialization: obj.specialization,
        college: obj.college,
        percentage: obj.percentage,
        cgpa: obj.cgpa,
        year_of_complete: obj.year_of_complete ? obj.year_of_complete : undefined,
      };

      employment_array.push(exp_obj);
      console.log(employment_array, "employment_array");
    })
  );

  setEmployment_edu(employment_array);

  // Rest of your code...
}





  // Certification Api Response
  
    if(getData.data.data.certification){
      let exp_array = getData.data.data.certification;
      let employment_array = []
    //  console.log(exp_array, "exp_array")
      exp_array.map((obj, index) => {    
        let exp_obj = {
          certificate_complete_yr : obj.certificate_complete_yr,
          certificate_name : obj.certificate_name,
          certificate_technology : obj.certificate_technology,
          certificate_vendor : obj.certificate_vendor,
         }
         employment_array.push(exp_obj)
      })
      setEmployment_certi(employment_array)
   }
 
  // Course Api Response

    if(getData.data.data.courses){
      let exp_array = getData.data.data.courses;
      let employment_array = []
   //   console.log(exp_array, "course_array")
      exp_array.map((obj, index) => {  
     //     console.log(obj.course_complete_yr, "obj.course_complete_yr")
        let exp_obj = {
          course_name: obj.course_name,
          course_complete_yr: obj.course_complete_yr ? obj.course_complete_yr : null,
          course_duration: obj.course_duration,
          course_technology: obj.course_technology,
          course_vendor: obj.course_vendor,   
        };
         employment_array.push(exp_obj)
      })
      setEmployment_course(employment_array)
   }
  

  
  // Project Api Response
  if(getData.data.data.projects){
    let exp_array = getData.data.data.projects;
    let employment_array = []
  //  console.log(exp_array, "course_array")
    exp_array.map((obj, index) => {  
      let exp_obj = {
        project_name: obj.project_name,
        project_for: obj.project_for,
        project_complete_yr: obj.project_complete_yr,
        project_summary: obj.project_summary
      };
       employment_array.push(exp_obj)
    })
    setEmployment_pro(employment_array)
   
 }
  // Hobbies Api Response
 
    if(getData.data.data.hobbies){
      let exp_array = getData.data.data.hobbies;
      let employment_array = []
   //   console.log(exp_array, "course_array")
      exp_array.map((obj, index) => {  
         employment_array.push(obj.english)
      })
      setHobbies_hob(employment_array)    
   }
  // Skills Api Response
   
    if(getData.data.data.skills){
      let exp_array = getData.data.data.skills;
      let employment_array = []
   //  console.log(exp_array, "course_array skills 1111111")
      exp_array.map((obj, index) => {
        //  console.log(obj, "course_array skills 22222222")
         employment_array.push(obj.skill)
      })
      setSkills_skill(employment_array)    
   }
  
  // Languages Api Response

   
    if(getData.data.data.languages){
      let exp_array = getData.data.data.languages;
      let employment_array = []
      exp_array.map((obj, index) => {  
         employment_array.push(obj.english)
      })
      setLanguages_lang(employment_array)
   }
   
  
 // General Api Response

  setName(getData.data.data.general.name);
  setEmail(getData.data.data.general.email);
  setMobile(getData.data.data.general.mobile1);
  setGender(getData.data.data.general.gender);
  setNationality(getData.data.data.general.country);
  setIs_experience(parseInt(getData.data.data.general.canditate_type));
  setDob(getData.data.data.general.dob);
  setNotice_period(getData.data.data.general.notice_period);
  setYear_experience(getData.data.data.general.year_experience);
  setCtc(getData.data.data.general.ctc)
  setEctc(getData.data.data.general.ectc);
  setOpportunity(getData.data.data.general.opportunity);
  setProfile_title(getData.data.data.general.profile_title);
  setAddress(getData.data.data.general.street)
  setCountry(getData.data.data.general.country)
  setState(getData.data.data.general.state)
  setCity(parseInt(getData.data.data.general.district))
  setPincode(getData.data.data.general.pincode)
  setExperience_Summary(getData.data.data.general.experience_summary)


  setPhonecodeArray(phonecodeTArray);
//  console.log(country, "country check")
  if(getData.data.data.general.country){
 //   console.log(country, "useeffect country");
      let countryId = getData.data.data.general.country;
      let stateTArray = [];
      const response = await axios.get(
        `${baseURL}/states?id=${countryId}`
      );
      for (let i = 0; i < response.data.data.length; i++) {
        let stateList = {
          value: response.data.data[i].id,
          label: response.data.data[i].name,
        };
        stateTArray.push(stateList);
      }
      setStateArray(stateTArray);
    //  console.log(stateArray, "state array");
      // Process the data or update the state

  }
  if(getData.data.data.general.state){
      let stateId = getData.data.data.general.state
      let cityTArray = [];
      const response = await axios.get(
        `${baseURL}/cities?id=${stateId}`
      );
    //  console.log(response, "res");
      for (let i = 0; i < response.data.data.length; i++) {
        let cityList = {
          value: response.data.data[i].id,
          label: response.data.data[i].name,
        };
        cityTArray.push(cityList);
      }
      setCityArray(cityTArray);
  }
 // console.log(nationality, "Nationality array");

  
 }
// *********************** Education parts API Calls ***************

const edu_qualificationP = async () => {
  let countryArray_edu = []
  const response_edu = await axios.get(`${baseURL}/primary_qualification`)
  for (let i=0; i<response_edu.data.data.length; i++){
    let countryList =  {
      value: response_edu.data.data[i].id,
      label: response_edu.data.data[i].english,
    }
    countryArray_edu.push(countryList)
  }
  setNationalityArray_edu(countryArray_edu)
 // console.log(nationalityArray_edu, "NationalityArray_edu")

}
const edu_specialization = async (e) => {

  let specializationTArray_edu = []
  const spe_response_edu = await axios.get(`${baseURL}/master/specialization/${e}`);
  for (let i=0; i<spe_response_edu.data.data.length; i++){
    let specializationList =  {
      value: spe_response_edu.data.data[i].english,
      label: spe_response_edu.data.data[i].english,
    }
    specializationTArray_edu.push(specializationList)
  }

setSpecializationArray_edu(specializationTArray_edu)

}
const edu_college = async () => {
  let collegeTArray_edu = []
  const college_response_edu = await axios.get(`${baseURL}/college`);
  for (let i=0; i<college_response_edu.data.data.length; i++){
    let collegeList =  {
      value: college_response_edu.data.data[i].english,
      label: college_response_edu.data.data[i].english,
    }
    collegeTArray_edu.push(collegeList)
  }
  setCollegeArray_edu(collegeTArray_edu)


}


// *********************** Employment parts API Calls ***************

// *********************** Certification parts API Calls ***************

const certi_vendor = async (e) => {
  let vendorTArray_certi = []
  const response_certi = await axios.get(`${baseURL}/master/vendors/${e}`)
          for (let i=0; i<response_certi.data.data.length; i++){
            let vendorList =  {
              value: response_certi.data.data[i].english,
              label: response_certi.data.data[i].english,
            }
            vendorTArray_certi.push(vendorList)
          }
          setVendorArray_certi(vendorTArray_certi)
      
}
const certi_technology = async (e) => {
  let technologyTArray_certi = []
  const spe_response_certi = await axios.get(`${baseURL}/master/course_technology/${e}`);
  for (let i=0; i<spe_response_certi.data.data.length; i++){
    let technologyList =  {
      value: spe_response_certi.data.data[i].english,
      label: spe_response_certi.data.data[i].english,
    }
    technologyTArray_certi.push(technologyList)
  }
  setTechnologyArray_certi(technologyTArray_certi)

}

// *********************** Course parts API Calls ********************

const course_vendor = async (e) => {
let vendorTArray_course = []
const response_course = await axios.get(`${baseURL}/master/vendors/${e}`)
for (let i=0; i<response_course.data.data.length; i++){
  let vendorList =  {
    value: response_course.data.data[i].english,
    label: response_course.data.data[i].english,
  }
  vendorTArray_course.push(vendorList)
}
setVendorArray_course(vendorTArray_course)

}

const course_technology = async (e) => {
  let technologyTArray_course = []
  const spe_response_course = await axios.get(`${baseURL}/master/course_technology/${e}`);
  for (let i=0; i<spe_response_course.data.data.length; i++){
    let technologyList =  {
      value: spe_response_course.data.data[i].english,
      label: spe_response_course.data.data[i].english,
    }
    technologyTArray_course.push(technologyList)
  }
  setTechnologyArray_course(technologyTArray_course)
}

// *********************** Hobbies parts API Calls ***************
const hobby_getapi = async (e) => {
  let vendorTArray_hob = []

  const response_hob = await axios.get(`${baseURL}/master/hobbies/${e}`)
          for (let i=0; i<response_hob.data.data.length; i++){
            let vendorList =  {
              value: response_hob.data.data[i].english,
              label: response_hob.data.data[i].english,
            }
            vendorTArray_hob.push(vendorList)
          }
          setVendorArray_hob(vendorTArray_hob)

}

// *********************** Skills parts API Calls *****************
const skills_getapi = async (e) => {
  let vendorTArray_skill = []
const response_skill = await axios.get(`${baseURL}/master/skills/${e}`)
for (let i=0; i<response_skill.data.data.length; i++){
 let vendorList =  {
   value: response_skill.data.data[i].english,
   label: response_skill.data.data[i].english,
 }
 vendorTArray_skill.push(vendorList)
}
setVendorArray_skill(vendorTArray_skill)
}

// *********************** Languages parts API Calls ***************
const lang_getapi = async (e) => {
let vendorTArray_lang = []
const response_lang = await axios.get(`${baseURL}/master/language/${e}`)
for (let i=0; i<response_lang.data.data.length; i++){
  let vendorList =  {
    value: response_lang.data.data[i].english,
    label: response_lang.data.data[i].english,
  }
  vendorTArray_lang.push(vendorList)
}
setVendorArray_lang(vendorTArray_lang)
}

//****************************  MAIN API CALLS *************************

  const mainApi = async (value, fieldname) => {
   // console.log(value, "api call")
    setSpinLoading(true)
    console.log("ready for api call")
    const exp = fieldname === 'employment' ? value : employment;
    const educationsA = fieldname === 'education' ? value : employment_edu;
    const coursesA = fieldname === 'course' ? value : employment_course;
    const certificationA = fieldname === 'certification' ? value : employment_certi;
    const projectsA = fieldname === 'project' ? value : employment_pro;
    const skillsA = fieldname === 'skillsList' ? value : skills_skill;
    const languagesA = fieldname === 'languagesList' ? value : languages_lang;
    const hobbiesA = fieldname === 'hobbiesList' ? value : hobbies_hob;
 //  console.log(educationsA , "educationsA  delete")
 //   console.log(exp, "exp1111111")
    const requestBody = {
      id: 103,
      general: 
        {name,
        email,
        mobile,
        gender,
        dob,
        nationality,
        is_experience,
        notice_period,
        year_experience,
        ctc,
        ectc,
        opportunity,
        profile_title,
        address,
        country,
        state,
        city,
        pincode,
        experience_summary,
        country_code
        },
  

      experience: exp, 
      educations: educationsA,
      courses: coursesA,
      certification: certificationA,
      projects: projectsA,
      skills: skillsA,
      languages: languagesA,
      hobbies: hobbiesA
    };
//    console.log(requestBody, "requestBody 3333333333")
    const response = await axios.post(`${baseURL}/profileupdate`, requestBody);
    getApiCall()
    //   console.log(response.data, "response data")
    setSpinLoading(false)
   // console.log(spinLoading, "SpinLoading set 111111")
  };



  const ondescription = (value) => {
    setuserInfo({ ...userInfo, description: value });
   // console.log(userInfo, "userinfo");
  };

  const sanitizedHtml = DOMPurify.sanitize(userInfo.description);
  const formattedText = (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
  );
 
  const [qsummary, setQsummary] = useState("");
  function handleGenderChange(event) {
    setGender(event);

  }
  function handleNotice_periodChange(event) {
    setNotice_period(event);

  }
  function handleOpportunityChange(event) {
    setOpportunity(event);

  }
  function handleProfiletitleChange(event) {
    setProfile_title(event.target.value);

  }
  function handleCtcChange(event) {
    setCtc(event.target.value);
  }
  function handleExpectCtcChange(event) {
    setEctc(event.target.value);
  }
  function handleStreetChange(event) {
    setAddress(event.target.value);
  }
  function handleCandidateValueChange(event) {
    setIs_experience(event.target.value);
  }
  function handlePhoneChange(event) {
   // console.log(event.target.value, "phone number")
    setMobile(event.target.value);
  }
  function handlePhonecodeChange(event) {
    setCountry_code(event);
  }
  function handleCountryChange(event) {
 //   console.log(event, "country id 1111111111")
    setCountry(event);
    const fetchData = async () => {
      try {
        let stateTArray = [];
        const response = await axios.get(
          `${baseURL}/states?id=${event}`
        );
        for (let i = 0; i < response.data.data.length; i++) {
          let stateList = {
            value: response.data.data[i].id,
            label: response.data.data[i].name,
          };
          stateTArray.push(stateList);
        }
        setStateArray(stateTArray);
    //    console.log(stateArray, "state array");
      } catch (error) {

      }
    };
    fetchData();
  }
  function handleStateChange(event) {
    setState(event);

    const fetchData = async () => {
      try {
        let cityTArray = [];
        const response = await axios.get(
          `${baseURL}/cities?id=${event}`
        );
      //  console.log(response, "res");
        for (let i = 0; i < response.data.data.length; i++) {
          let cityList = {
            value: response.data.data[i].id,
            label: response.data.data[i].name,
          };
          cityTArray.push(cityList);
        }
        setCityArray(cityTArray);
      } catch (error) {
        // Handle any errors
      }
    };
    fetchData();
  }
  function handleCityChange(event) {
    setCity(event);
  }

  function handleYearExperienceChange(date, dateString) {
 //   console.log(date, dateString, moment(year_experience).format('YYYY-MM'), "date, dateString year_experience")
    setYear_experience(dateString);
  }


  function handleDobChange(date, dateString) {
 //   console.log(date, dateString, moment(dateString).format('YYYY-MM-DD'), "date11111111111")  
    setDob(dateString);
  }

  function handlePostalCodeChange(event) {
    setPincode(event.target.value);
  }
 
  function handleNationalityChange(event) {
 //   console.log(event, "country code 111111111111");
    setNationality(event);
  }
 
  function handleEmployementDetail(detail, field) {
  //  console.log(detail, field, "employee detail 11111")
    setExperience(detail);
    if(field == 'updateArray'){
      mainApi(detail, "Employment");
    }
  }
  function handleEducationDetail(detail, field) {
    setEducations(detail);
    if(field == 'updateArray'){
    mainApi(detail, "Employment");
    }
  }
  function handleCourseDetail(detail, field) {
    setCourses(detail);
    if(field == 'updateArray'){
     mainApi(detail, "Employment");
    }
  }
  function handleCertificationDetail(detail, field) {
    setCertification(detail);
    if(field == 'updateArray'){
    mainApi(detail, "Employment");
    }
  }
  function handleProjectDetail(detail, field) {
    setProjects(detail);
    if(field == 'updateArray'){
    mainApi(detail, "Employment");
    }
  }
  function handleSkillsDetail(detail, field) {
    setSkills(detail);
    if(field == 'updateArray'){
    mainApi(detail, "Employment");
    }
  }
  function handleHobbiesDetail(detail, field) {
    setHobbies(detail);
    if(field == 'updateArray'){
    mainApi(detail, "Employment");
    }
  }
  function handleLanguagesDetail(detail, field) {
    setLanguages(detail);
    if(field == 'updateArray'){
    mainApi(detail, "Employment");
    }
  }  
  function handleExperienceSummaryChange(event) {
    setExperience_Summary(event.target.value);
  }

  function handleShowAdditionalDetails(event) {
    event.preventDefault();
    setShowAdditionalDetails(!showAdditionalDetails);
  }

  function handletalentNameChange(event) {
    setName(event.target.value);
  }

  function handleTalentEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleSetExperience(setStates) {
    setExperience(setStates)

  }
  function handleSetEducation(setStates) {
    setEducations(setStates)
   
  }
  function handleSetCertification(setStates) {
    setCertification(setStates)
 
  }
  function handleSetCourse(setStates) {
    setCourses(setStates)
   
  }
  function handleSetProject(setStates) {
    setProjects(setStates)
 
  }
  function handleSetHobbies(setStates) {
    setHobbies(setStates)

  }
  function handleSetSkills(setStates) {
    setSkills(setStates)
  
  }
  function handleSetLanguages(setStates) {
    setLanguages(setStates)
  
  }
 



//**************  Employment Coding start here  *****************

const handleSetCompany_emp = async(e) => {
  let companyTArray = []
  const response = await axios.get(`${baseURL}/master/current_company/${e}`)
 // console.log(response.data.data, "res")
  for (let i=0; i<response.data.data.length; i++){
    let companyList =  {
      value: response.data.data[i].english,
      label: response.data.data[i].english,
    }
    companyTArray.push(companyList)
  }
  setCompanyArray(companyTArray)
 // console.log(companyTArray, "array")
}

const handleSetDesignation_emp = async(e) => {
let designationTArray = []
const des_response = await axios.get(`${baseURL}/master/designation/${e}`)
for (let i=0; i<des_response.data.data.length; i++){
  let designationList =  {
    value: des_response.data.data[i].english,
    label: des_response.data.data[i].english,
  }
  designationTArray.push(designationList)
}
setDesignationArray(designationTArray)
}

const handleCompanyChange_emp = (event, index, field) => {
 // console.log(event, "11111value")
  setSelectedCompanyItem(event[0]);
  setShowCompanyMessage(false);
  handleEmployementChange_emp(event, index, field)
};
const handleCompanyDropdownVisibleChange_emp = (visible) => {
 // console.log(visible, "222222value")
  if (visible && selectedCompanyItem) {
    setShowCompanyMessage(true);
  }
  
};

const renderCompanyMenu_emp = () => {
  if (showCompanyMessage) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};


const handleDesignationChange_emp = (value) => {
  setSelectedDesignationItem(value[0]);
  setShowDesignationMessage(false);
};

const handleDesignationDropdownVisibleChange_emp = (visible) => {
  if (visible && selectedDesignationItem) {
    setShowDesignationMessage(true);
  }
};

const renderDesignationMenu_emp = () => {
  if (showDesignationMessage) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};
const handleCheckboxChange_emp = (e) => {
//  console.log(e, "handleCheckboxChange_emp")
  setIschecked(e.target.checked);
}
const handleAddEmployment_emp = () => {
 // setShowEmployment(-1); // reset state when adding a new item
  setEmployment([
    ...employment,
    {
      currently_working: 0,
      current_company: "",
      job_designation: "",
      employment_type: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      job_summary: "",
      job_accomplishments: "",
    },
  ]);
  // setShowEmployment(1)
//  console.log(employment, "employment employment")
};

const handleDeleteHobby_emp = (index) => {
  const newEmployment = [...employment];
  newEmployment.splice(index, 1);
  setEmployment(newEmployment);
  mainApi(newEmployment, "employment")
 // detail(newEmployment, "updateArray");
};


const handleToggleAccordion_emp = (index) => {
  if (showEmployment === index) {
    setShowEmployment(-1); // toggle off if same item is clicked again
  } else {
    setShowEmployment(index);
  }
};

const handleEmployementChange_emp = (event, index, field) => {
 
//  console.log(event, "event of employement")
  var summary_value;
  var endMonth;
  var endYear;
  if(field === 'job_summary'){
    // console.log(event.target.value, "job summary")
     summary_value = event.target.value
  //  var doc = new DOMParser().parseFromString(event, 'text/html');
  //   const plainText = event.replace(/<[^>]*>/g, '');
  //   console.log(plainText, "summary_job check");
    // summary_value = event

    //try this
    // const newDescription = {...userInfo};
    // newDescription.description = event;
    // console.log(newDescription.description, "newDescription.description")
    // setuserInfo({ ...userInfo, description: event });
    // const sanitizedHtml = DOMPurify.sanitize( newDescription.description)
    // const formattedText = <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>;
    // summary_value = formattedText.props.dangerouslySetInnerHTML.__html;
    // const requestBody = JSON.stringify({ job_summary: summary_value });


   // console.log(requestBody, "requestBody.........")
   // setQuillSet(summary_value)
    // summary_value = formattedText;
  //  console.log(formattedText, summary_value, "summary_job 2222222222")

  //  console.log(userInfo.description, "userInfo description")
  } 
  else if(field === 'currently_working'){
    setIschecked(event.target.checked)
    if(event.target.checked === true){
      summary_value = 1
    }
    else{
      summary_value = 0
    }
    
  }
  else if( field === 'start_month' || field === 'end_month'  || field === 'employment_type'){
   // console.log(event, "year field 11111111111")
    summary_value = event
  }
  else if(field === 'start_year' || field === 'end_year') {
    // console.log(event, "field 11111");
    // let year_val = moment(event).format('YYYY')
    // console.log(year_val, "year_val")
    // summary_value = year_val
    summary_value = event;

  }
  else if(field === "current_company"){
   // console.log(event, "company evnt")
    setSelectedCompanyItem(event[0]);
    summary_value = event[0];
  }
  else if(field === "job_designation"){
    setSelectedDesignationItem(event[0])
    summary_value = event[0];
  }
  else{
    summary_value = event.target.value
  }
  const newEmployment = [...employment];
  newEmployment[index][field] = summary_value;
  if(isChecked){
    newEmployment[index]['end_month'] = ''
    newEmployment[index]['end_year'] = ''
  }
  setEmployment(newEmployment);
  //detail(newEmployment)
//  console.log(newEmployment, "newEmployment")
};

const handleSubmit_emp = (event) => {
  event.preventDefault();
};
const handleCompanyLeave_emp = () => {
  setShowCompanyMessage(false);
  setShowCollegeMessage_edu(false);
  setShowSpecializationMessage_edu(false);
  setShowVendorMessage_certi(false);
  setShowTechnologyMessage_certi(false);
  setShowVendorMessage_course(false);
  setShowTechnologyMessage_course(false);

}

const handleDesignationLeave_emp = () => {
  setShowDesignationMessage(false);
}

const handleApiCall_emp = () => {
 // detail(employment, "updateArray")
 mainApi();

}

// ***************  Education Coding Start Here *******************


function handleCountryChange_edu(event, index, field) {
 // console.log("check check check check")
  setCountry_edu(event);
  const fetchData = async () => {
    try {
    //  console.log("stateTArray check check")
      let stateTArray = []
      const response = await axios.get(`${baseURL}/secondary_qualification?id=${event}`)
    // console.log(response, "stateTArray res")
      for (let i=0; i<response.data.data.length; i++){
        let stateList =  {
          value: response.data.data[i].id,
          label: response.data.data[i].english,
        }
        stateTArray.push(stateList)
      }
      console.log(stateTArray, "wwwwwwwwwwwwwwwwwww")
     // setStateArray_edu(...stateArray_edu, [stateTArray])
      setStateArray_edu(stateTArray);
     // console.log("hello check 123")
      console.log(stateArray_edu, "stateTArray stateTArray stateTArray")
      handleEmploymentChange_edu(event, index, field)
      handleEmploymentChange_edu(stateTArray, index, "degree")

    
      // Process the data or update the state
    } catch (error) {
      // Handle any errors
    }
  };
  fetchData();
}

// const handleCompanyLeave = () => {
//   setShowCompanyMessage(false);
// }
const handleSpecializationChange_edu = (event, index, field) => {
  setSelectedSpecializationItem_edu(event[0]);
  setShowSpecializationMessage_edu(false);
  handleEmploymentChange_edu(event, index, field)
};

const handleSpecializationDropdownVisibleChange_edu = (visible) => {
  if (visible && selectedSpecializationItem_edu) {
    setShowSpecializationMessage_edu(true);
  }
};

const renderSpecializationMenu_edu = () => {
  if (showSpecializationMessage_edu) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};

const handleCollegeChange_edu = (event, index, field) => {
  setSelectedCollegeItem_edu(event[0]);
  setShowCollegeMessage_edu(false);
  handleEmploymentChange_edu(event, index, field)
};

const handleCollegeDropdownVisibleChange_edu = (visible) => {
//  console.log("visiiiii")
  if (visible && selectedCollegeItem_edu) {
    setShowCollegeMessage_edu(true);
  }
};

const renderCollegeMenu_edu = () => {
  if (showCollegeMessage_edu) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};

const handleCheckboxChange_edu = () => {
  setIschecked_edu(!isChecked_edu);
}
const handleAddEmployment_edu = () => {
  setShowEmployment_edu(-1); // reset state when adding a new item
  setEmployment_edu([
    ...employment_edu,
    {
      primary_qualification: "",
      degree: "",
      secondary_qualification: "",
      specialization: "",
      college: "",
      percentage: "",
      cgpa: "",
      year_of_complete: ""
    },
  ]);
};

const handleDeleteHobby_edu = (index) => {
  const newEmployment = [...employment_edu];
  newEmployment.splice(index, 1);
  setEmployment_edu(newEmployment);
  mainApi(newEmployment, "education")
  //detail(newEmployment, "updateArray");
};

const handleToggleAccordion_edu = (index) => {
  if (showEmployment_edu === index) {
    setShowEmployment_edu(-1); // toggle off if same item is clicked again
  } else {
    setShowEmployment_edu(index);
  }
};

const handleHobbyChange_edu = (event, index, field) => {
  const newEmployment = [...employment_edu];
  newEmployment[index][field] = event.target.value;
  setEmployment_edu(newEmployment);
};
const handleEmploymentChange_edu = (event, index, field) => {
  var summary_value;
  if(field === 'degree'){
    console.log(event, "degrees")
    summary_value = event
 
  }
  else if(field === 'job_description' || field === 'job_summary'){
    const newDescription = {...userInfo};
    newDescription.description = event;
    setuserInfo_edu({ ...userInfo_edu, description: event });
    const sanitizedHtml = DOMPurify.sanitize( newDescription.description)
    const formattedText = <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>;
    summary_value = formattedText
  } 
  else if(field === 'primary_qualification' || field === 'year_of_complete' ){
    summary_value = event
  }
  else if(field === 'secondary_qualification'){
    summary_value = event
  }

  else if(field === 'specialization' ){
   // console.log(event, "specialization success")
    setSelectedSpecializationItem_edu(event[0]);
    summary_value = event[0]

  }
  else if(field === 'college'){
    setSelectedCollegeItem_edu(event[0]);
    summary_value = event[0]

  }
  else{
    summary_value = event.target.value
  }
  console.log(summary_value, "summary_value")
  const newEmployment = [...employment_edu];
  newEmployment[index][field] = summary_value;
  setEmployment_edu(newEmployment);
  console.log(newEmployment, "newEmployment")
};

const handleSubmit_edu = (event) => {
  event.preventDefault();
};


// ***************** Certifiction Code ************************


const handleVendorChange_certi = (event, index, field) => {
  setSelectedVendorItem_certi(event[0]);
  setShowVendorMessage_certi(false);
  handleEmployementChange_certi(event, index, field)
};

const handleVendorDropdownVisibleChange_certi = (visible) => {
  if (visible && selectedVendorItem_certi) {
    setShowVendorMessage_certi(true);
  }
};

const renderVendorMenu_certi = () => {
  if (showVendorMessage_certi) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};

const handleTechnologyChange_certi = (event, index, field) => {
  setSelectedTechnologyItem_certi(event[0]);
  setShowTechnologyMessage_certi(false);
  handleEmployementChange_certi(event, index, field)
};

const handleTechnologyDropdownVisibleChange_certi = (visible) => {
  if (visible && selectedTechnologyItem_certi) {
    setShowTechnologyMessage_certi(true);
  }
};

const renderTechnologyMenu_certi = () => {
  if (showTechnologyMessage_certi) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};

const handleAddEmployment_certi = () => {
  setShowEmployment_certi(-1); // reset state when adding a new item
  setEmployment_certi([
    ...employment_certi,
    {
      certificate_name: "",
      certificate_vendor: "",
      certificate_technology: "",
      certificate_complete_yr: ""
    },
  ]);
};

const handleDeleteHobby_certi = (index) => {
  const newEmployment = [...employment_certi];
  newEmployment.splice(index, 1);
  setEmployment_certi(newEmployment);
  mainApi(newEmployment, "certification")
};

const handleToggleAccordion_certi = (index) => {
  if (showEmployment_certi === index) {
    setShowEmployment_certi(-1); // toggle off if same item is clicked again
  } else {
    setShowEmployment_certi(index);
  }
};
const handleEmployementChange_certi = (event, index, field) => {
  var summary_value;
  if(field === 'job_description' || field === 'job_summary'){
    const newDescription = {...userInfo_certi};
    newDescription.description = event;
    setuserInfo_certi({ ...userInfo_certi, description: event });
    const sanitizedHtml = DOMPurify.sanitize( newDescription.description)
    const formattedText = <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>;
    summary_value = formattedText
  } 
  else if(field === 'certificate_complete_yr') {
    summary_value = event
  }

  else if(field === 'certificate_vendor'){
    setSelectedVendorItem_certi(event[0]);
    summary_value = event[0]
  }

  else if(field === 'certificate_technology'){
    setSelectedTechnologyItem_certi(event[0]);
    summary_value = event[0]
  }

  else{
    summary_value = event.target.value
  }
  const newEmployment = [...employment_certi];
  newEmployment[index][field] = summary_value;
  setEmployment_certi(newEmployment);
 // detail(employment)
};

const handleSubmit_certi = (event) => {
  event.preventDefault();
};

// ***************** Course Code ************************

const handleVendorChange_course = (event, index, field) => {
  setSelectedVendorItem_course(event[0]);
  setShowVendorMessage_course(false);
  handleEmploymentChange_course(event, index, field)
};

const handleVendorDropdownVisibleChange_course = (visible) => {
  if (visible && selectedVendorItem_course) {
    setShowVendorMessage_course(true);
  }
};

const renderVendorMenu_course = () => {
  if (showVendorMessage_course) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};

const handleTechnologyChange_course_course = (event, index, field) => {
  setSelectedTechnologyItem_course(event[0]);
  setShowTechnologyMessage_course(false);
  handleEmploymentChange_course(event, index, field)
};

const handleTechnologyDropdownVisibleChange_course = (visible) => {
  if (visible && selectedTechnologyItem_course) {
    setShowTechnologyMessage_course(true);
  }
};

const renderTechnologyMenu_course = () => {
  if (showTechnologyMessage_course) {
    return (
      <Menu>
        <Menu.Item key="1" disabled>
             You can select only one item
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};
const handleCheckboxChange_course = () => {
  setIschecked_course(!isChecked_course);
}
const handleAddEmployment_course = () => {
  setShowEmployment_course(-1); // reset state when adding a new item
  setEmployment_course([
    ...employment_course,
    {
      course_name: "",
      course_vendor: "",
      course_technology: "",
      course_complete_yr: "",
      course_duration: ""
    },
  ]);
};



const handleDeleteHobby_course = (index) => {
  const newEmployment = [...employment_course];
  newEmployment.splice(index, 1);
  setEmployment_course(newEmployment);
  mainApi(newEmployment, "course")
  
};


const handleToggleAccordion_course = (index) => {
  if (showEmployment_course === index) {
    setShowEmployment_course(-1); // toggle off if same item is clicked again
  } else {
    setShowEmployment_course(index);
  }
};
const handleEmploymentChange_course = (event, index, field) => {
  var summary_value;
  if(field === 'job_description' || field === 'job_summary'){
    const newDescription = {...userInfo_course};
    newDescription.description = event;
    setuserInfo_course({ ...userInfo_course, description: event });
    const sanitizedHtml = DOMPurify.sanitize( newDescription.description)
    const formattedText = <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>;
    summary_value = formattedText
  } 
  else if(field === 'course_complete_yr'){
    summary_value = event
  }

  else if(field === 'course_vendor'){
    setSelectedVendorItem_course(event[0]);
    summary_value = event[0]
  }

  else if(field === 'course_technology'){
    setSelectedTechnologyItem_course(event[0]);
    summary_value = event[0]
  }

  else{
    summary_value = event.target.value
  }
  const newEmployment = [...employment_course];
  newEmployment[index][field] = summary_value;
  setEmployment_course(newEmployment);
 
};

const handleSubmit_course = (event) => {
  event.preventDefault();
};


// ***************** Hobbies Code ************************
const handleHobbiesChange_hob = (e) => {
  setHobbies_hob(e)
  mainApi(e, "hobbiesList")
}

// ***************** Project  Code ************************
const handleCheckboxChange_pro = () => {
  setIschecked_pro(!isChecked);
}
const handleAddEmployment_pro = () => {
  setShowEmployment_pro(-1); // reset state when adding a new item
  setEmployment_pro([
    ...employment_pro,
    {
      project_name: "",
      project_for: "",
      project_complete_yr: "",
      project_summary: ""
    },
  ]);
};
const handleDeleteHobby_pro = (index) => {
  const newEmployment = [...employment_pro];
  newEmployment.splice(index, 1);
  setEmployment_pro(newEmployment);
  mainApi(newEmployment, "project")
};
const handleToggleAccordion_pro = (index) => {
  if (showEmployment_pro === index) {
    setShowEmployment_pro(-1); // toggle off if same item is clicked again
  } else {
    setShowEmployment_pro(index);
  }
};
const handleEmployementChange_pro = (event, index, field) => {
  console.log("entered")
  var summary_value;
  if(field === 'job_description' || field === 'job_summary'){
    const newDescription = {...userInfo_pro};
    newDescription.description = event;
    setuserInfo_pro({ ...userInfo_pro, description: event });
    const sanitizedHtml = DOMPurify.sanitize( newDescription.description)
    const formattedText = <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>;
    summary_value = formattedText
  } 
  else if(field === 'project_for' || field === 'project_complete_yr'){
    summary_value = event
  }
  else{
    summary_value = event.target.value
  }
  const newEmployment = [...employment_pro];
  newEmployment[index][field] = summary_value;
  setEmployment_pro(newEmployment);
  console.log(newEmployment, "newEmployment 1234567890")
  // detail(employment)
};

// const handleSubmit_pro = (event) => {
//   event.preventDefault();

// };


// ***************** Skills Code ************************

const handleSkillsChange_skill= (e) => {
  setSkills_skill(e)
  mainApi(e, "skillsList")
}
// ***************** Languages  Code ************************
 const handleLanguagesChange_lang = (e) => {
    setLanguages_lang(e)
    mainApi(e, 'languagesList')
 }

 //  ******************* New code Image ***********************

 const handleImagefileChange = (event) => {
  console.log(event)
  setSelectedFile(event.target.files[0]);
};
const handleImageDelete = () => {
  setSelectedFile(null);
  document.getElementById('image').value = '';
};

//  ******************* New code vendor ***********************

// const handleVendorChangeDD = (event, index, field) => {
//   if (event.length > 1) {
//     // Allow only one value to be selected
//     setSelectedVendorValueDD([event[event.length - 1]]);
//   } else {
//     setSelectedVendorValueDD(event[0]);
//   }

//   handleEmploymentChange_edu(event[0], index, field)



// }
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 50,
    }}
    spin
  />
);

// CKeditors
const handlePrevious = () => {
  navigate('/dashboard');
}

const handleRowChange = (index, value, field) => {
 // console.log(index, value, field, "IVF IVF IVF")
  const updatedRows = [...employment];
  var summary_value = value;
  updatedRows[index][field] = summary_value;
  setEmployment(updatedRows);
  setDummyjob(updatedRows)
};

const { register, handleSubmit, formState: {errors} } = useForm()


const dateFormat = 'YYYY/MM/DD';

const monthFormat = 'YYYY/MM';
  return (
    <>
    <Navbar />
    <div className="container-fluid resume-builder">
 

 {
  responseData == '' ? <Spin indicator={antIcon}  className="spinIndicator"/>
  :

      <div className="row col-md-12">
        <div className="col-md-6 resume-builder-left">
        {/* <Button type="primary" className="back-btn" onClick={handlePrevious}>Back</Button> */}
       <div><Button type="primary" icon={<ArrowLeftOutlined />} className="back-btn" onClick={handlePrevious}>
            Back
        </Button></div>
          <h2 className="resume-title" style={{ paddingLeft: "10px" }}>
            Update General
          </h2>
          <form>
            <div className="row col-md-12 imageField-row left-row">
              <div className="col-md-6 inputField">
                <label htmlFor="name">Talent Name</label>
                <Input
                  placeholder="Enter Talent Full Name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={handletalentNameChange}
                />
              </div>
              <div className='col-md-6 inputField imageField'  >
                 { selectedFile ?
                    <img className='resume-img' src={URL.createObjectURL(selectedFile)} alt="Selected" />
                  : <img className='resume-img' src={avatar} alt="Selected" onClick={() => document.getElementById('image').click()}/>
             
                   }
                    { selectedFile ?
                     <div>
                         <label htmlFor='image'><i class="fas fa-edit"></i> Edit file</label>
                         <Input type="file" id="image" onChange={handleImagefileChange} />
                     </div>
                   :
                     <div>
                         <label htmlFor='image'><i class="fas fa-upload"></i> Upload file</label>
                         <Input type="file" id="image" onChange={handleImagefileChange} />
                     </div>
                    }
                 </div> 
              <div className="col-md-6 inputField">
                <label htmlFor="email">Talent Email Address</label>
                <Input
                  placeholder="Enter Talent Email Address"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleTalentEmailChange}
                />
              </div>
              <div className="col-md-6 inputField phone-field">
                {/* <div>
                  <label>Code</label>
                  <Select
                    showSearch
                    className="select-code"
                    defaultValue= "+91"
                    value= {country_code}
                    onChange={handlePhonecodeChange}
                    // onSearch={onSearch}
                    // filterOption={(input, option) =>
                    //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    //     }
                    options={phonecodeArray}
                  />
                </div> */}
                   <div>
                   <label>Code</label>
                   <Select
                       showSearch
                       className="select-code"
                       value={country_code}
                       onChange={handlePhonecodeChange}
                       options={phonecodeArray}
                    />
               </div>
                <div className="mobile-part">
                  <label>Mobile Number </label>
                  <Input
                    placeholder="Enter Mobile Number"
                    type="tel"
                    value={mobile}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="col-md-6 inputField">
                <label>Gender</label>
                <Select
                  showSearch
                  placeholder="Select Gender"
                  value={gender ? gender_options[gender] : undefined}
                  onChange={handleGenderChange}
                  autoComplete="off"
                  options={ gender_options }
                />
              </div>
              <div className="col-md-6 inputField">
                <label>Date of Birth</label>
                <DatePicker 
                value={dob ? (dayjs(dob, dateFormat)) : undefined}
                onChange={handleDobChange} 
                format={dateFormat}
                /> 
              </div>
              {/* <div className="col-md-6 inputField">
                <label>Nationality</label>
                <Select
                  showSearch
                  placeholder="Select Nationality"
                  value={nationality ? nationalityArray.find(option => option.value === nationality)?.label: undefined}
                  onChange={handleNationalityChange}
                  options={nationalityArray}
                  autoComplete="off"
                />
              </div>     */}
            </div>
            <div className="row col-md-12 left-row" style={{marginTop: '-15px'}}>
              {/* <h2 className="resume-title" style={{ paddingLeft: "10px" }}>
                Candidate Type
              </h2> */}
              <div className="col-md-12 radio-group-candidate inputField">
              <label>Candidate Type</label>
                  <Radio.Group 
                  onChange={handleCandidateValueChange}
                  value={is_experience}
                >
                  <Radio value={0}>Internship</Radio>
                  <Radio value={1}>Fresher</Radio>
                  <Radio value={2}>Experience</Radio>
                </Radio.Group>
              </div>
              <div className="col-md-6 inputField">
                <label>Notice Period</label>
                <Select
                  showSearch
                  placeholder="Select notice period"
                  onChange={handleNotice_periodChange}
                  value={notice_period}
                  options={[
                    {
                      value: 6,
                      label: "immediate",
                    },
                    {
                      value: 5,
                      label: "1 week",
                    },
                    {
                      value: 2,
                      label: "30 days",
                    },
                    {
                      value: 3,
                      label: "60 days",
                    },

                    {
                      value: 4,
                      label: "90 days",
                    },
                  ]}
                />
              </div>
              <div className="col-md-6 inputField">
                <label>Total Experience</label>
                <DatePicker 
                value={year_experience ? (dayjs(year_experience, monthFormat)) : undefined}
                onChange={handleYearExperienceChange} 
                picker="month" />
              </div>
              <div className="col-md-6 inputField">
                <label htmlFor="ctc">CTC</label>
                <Input
                  type="number"
                  placeholder="In Lakhs"
                  id="ctc"
                  value={ctc}
                  onChange={handleCtcChange}
                />
              </div>
              <div className="col-md-6 inputField">
                <label htmlFor="expect-ctc">Expected CTC</label>
                <Input
                  type="number"
                  placeholder="In Lakhs"
                  id="expect-ctc"
                  value={ectc}
                  onChange={handleExpectCtcChange}
                />
              </div>
              <div className="col-md-6 inputField">
                <label>Looking for Opportunity </label>
                <Select
                  showSearch
                  placeholder="Select Opportunity"
                  value={ opportunity_options ? opportunity_options[opportunity] : undefined}
                  onChange={handleOpportunityChange}
                  options={opportunity_options}
                />
              </div>
              <div className="col-md-6 inputField">
                <label htmlFor="profileTitle">Profile Title</label>
                <Input
                  placeholder="Enter profile title"
                  type="text"
                  id="profileTitle"
                  value={profile_title}
                  onChange={handleProfiletitleChange}
                />
              </div>
            </div>
            {showAdditionalDetails && (
              <div>
                <div className="row col-md-12 left-row">
                  <h2 className="resume-title" style={{ paddingLeft: "10px" }}>
                    Address
                  </h2>
                  <div className="col-md-12 inputField">
                    <label htmlFor="name">street</label>
                    <TextArea
                      placeholder="Enter your Address"
                      rows={1}
                      value={address}
                      onChange={handleStreetChange}
                    />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="country">Country</label>
                    <Select
                      value={country ? nationalityArray.find(option => option.value === country)?.label: undefined}
                      // value= 'India'
                      showSearch
                      placeholder="Select Country"
                      onChange={handleCountryChange}
                      options={nationalityArray}
                    />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="city">State</label>
                    <Select
                      showSearch
                      value={state ? stateArray.find(option => option.value === state)?.label : undefined}
                      placeholder="Select State"
                      onChange={handleStateChange}
                      options={stateArray}
                    />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="city">City</label>
                    <Select
                      showSearch
                     // value={city ? cityArray[city-1] : undefined}
                      value= {city ? cityArray.find(option => option.value === city)?.label: undefined} 
                      placeholder="Select City"
                      onChange={handleCityChange}
                      options={cityArray}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="name">Pincode:</label>
                    <Input
                      placeholder="Enter Pincode"
                      type="text"
                      id= "pincode"
                      value={pincode}
                      onChange={handlePostalCodeChange}
                    />
                  </div>
                </div>
              </div>
            )}
             <div className="row col-md-12" style={{display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'}}>
              {showAdditionalDetails ? (
                <div
                  onClick={handleShowAdditionalDetails}
                  className="col-md-6 btn-container"
                >
                  <button>Hide additional details </button>
                  <span className="up-arrow">
                    <i class="fa-sharp fa-solid fa-angle-up"></i>
                  </span>
                </div>
              ) : (
                <div
                  onClick={handleShowAdditionalDetails}
                  className="col-md-6 btn-container"
                >
                  <button>Edit additional details</button>
                  <span className="down-arrow">
                    <i class="fa-sharp fa-solid fa-angle-down"></i>
                  </span>
                </div>
              )}
                 { name || email || dob || nationality || gender || mobile || notice_period || year_experience || ctc || ectc || opportunity || profile_title || address || country || state || city || pincode?
          
                
              // <Button type="primary" icon={<UploadOutlined />} loading={spinLoading} className="submit-btn" onClick={mainApi}>
             <div className="saveBtn-container saveBtn-container-general"> <Button type="primary" icon={<UploadOutlined />} className="submit-btn" loading={spinLoading}  onClick={mainApi}>Save</Button>
            </div> 
               : ''
              }
            </div>
          </form>
          <div className="container">
          <div className="row col-md-12">
            <h2 className="resume-title" style={{paddingLeft:'0px'}}>Experience Summary</h2>
            <TextArea
              placeholder="Experience Summary"
              rows={3}
              value={experience_summary}
              onChange={handleExperienceSummaryChange}
              style={{marginTop: '9px' }}
            />
          </div>
          </div>

           {/* ********************* Employment HTML Code start here ****************** */}
    
    <div className="row col-md-12 employment">
      <div className="row col-md-12 " style={{paddingLeft: 0}}>
        <h2 className="resume-title">Employment</h2>
        <p className="sub-title">
            Employment details on your resume provide a comprehensive overview of 
            your work experience, including job titles, company names, dates of 
            employment, and key responsibilities and achievements in each role.
        </p>
      </div>

      {employment.map((hobby, index) => (
        <div key={index}>
          <Accordion allowZeroExpanded={true}>
            <AccordionItem>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
            <AccordionItemHeading>
                <AccordionItemButton onClick={() => handleToggleAccordion_emp(index)}>
               { hobby.current_company? hobby.current_company : 'Job Title' }
               </AccordionItemButton>
               </AccordionItemHeading>
               </div>
               <div>
               <Popconfirm
                     title="Delete the Job Detail"
                     description="Are you sure to delete this job detail?"
                    //  onConfirm={confirm}
                     onConfirm={() => handleDeleteHobby_emp(index)}
                    //  onCancel={cancel}
                     okText="Yes"
                     cancelText="No"
               >
              <Button className="delete-resume"> <i className="fa fa-trash"></i></Button>
            </Popconfirm>
            </div>
            </div>
              <AccordionItemPanel>
                <div className="row row_employment col-md-12">
                  <div className="col-md-6  inputField">
                    <label htmlFor="job_company_name">Company Name</label>
                      <Dropdown
                         overlay={renderCompanyMenu_emp}
                         visible={showCompanyMessage}
                         onVisibleChange={handleCompanyDropdownVisibleChange_emp}
                       >
                     <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a Company"
                            id="current_company"
                            onChange={  (event) => handleCompanyChange_emp(event, index, "current_company") }
                            onSearch={(e) => handleSetCompany_emp(e)}
                            value={hobby.current_company ? hobby.current_company : undefined}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                            onMouseLeave={handleCompanyLeave_emp}
                     >
                     {companyArray.map((option) => (
                         <Select.Option key={option.value} value={option.label}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                      </Dropdown>
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="job_designation">Designation</label>
                       <Dropdown
                           overlay={renderDesignationMenu_emp}
                           visible={showDesignationMessage}
                           onVisibleChange={handleDesignationDropdownVisibleChange_emp}
                       >
                     <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            id="job_designation"
                            placeholder="Search for a Designation"
                            onSearch = {(e) => handleSetDesignation_emp(e)}
                            onChange={ (event) => handleEmployementChange_emp(event, index, "job_designation")}  
                            // value={selectedDesignationItem ? [selectedDesignationItem] : []}
                            value={hobby.job_designation ? hobby.job_designation : undefined}
                            showSearch // Enable searching
                            onMouseLeave = {handleDesignationLeave_emp}
                            autoComplete = "off" // Disable autocomplete
                     >
                     {designationArray.map((option) => (
                         <Select.Option key={option.value} value={option.label}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                      </Dropdown>

                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="employment_type">Employment Type</label>
                  <Select
                    showSearch
                    placeholder="Select Employement Type"
                    // {hobby.employment_type}
                    value= {hobby.employment_type ? employment_type_options.find(option => option.value === hobby.employment_type)?.label : undefined}
                    onChange={ (event) => handleEmployementChange_emp(event, index, "employment_type")}
                    options={ employment_type_options }
                    autoComplete= 'off'
                   />   
                  </div>
                  </div>
                  <div className="col-md-12 check-additional">
                  <Input
                          id="checkbox-extend"
                          type="checkbox"
                          checked= {hobby.currently_working ? hobby.currently_working : 0}
                         // onChange={(e) => handleCheckboxChange_emp(e)}
                          onChange={ (event) => handleEmployementChange_emp(event, index, "currently_working")}
                         // onChange= {handleEmployementChange_emp(event, index, "start_month")}
                     />
                       <label htmlFor="checkbox-extend"> I am currently working in this role</label>
                
                  </div>
   
                <div className="row row_employment col-md-12">
                  <div className="col-md-6 inputField">
                      <label htmlFor="job_start_date">Start Date</label>
                      <Select
                              showSearch
                              placeholder="Start date"
                              id="start_month" 
                              value= {hobby.start_month ? month_options.find(option => option.value === hobby.start_month)?.label : undefined}
                             // value= {hobby.start_month ? month_options[hobby.start_month] : undefined} 
                              onChange={(event) => handleEmployementChange_emp(event, index, "start_month")}
                              options={month_options}
                   />
                     
                    </div>
                    <div className="col-md-6 inputField">
                      <label htmlFor="job_select_year">Select Year</label>
                            {/* <DatePicker 
                              picker="year" 
                              placeholder="Select year"
                              id="start_year" 
                              value= {hobby.start_year ? moment(hobby.start_year) : null} 
                              onChange={(event) => handleEmployementChange_emp(event, index, "start_year")}
                              /> */}
                      <Select
                           options={year_options}
                           placeholder="Select year"
                           id="start_year" 
                           value= {hobby.start_year ? hobby.start_year: undefined} 
                           onChange={(event) => handleEmployementChange_emp(event, index, "start_year")}
                         
                      />
                        
                    </div>
                    </div>
                 {!hobby.currently_working ?    <div className="row row_employment col-md-12">
                    <div className="col-md-6 inputField">
                      <label htmlFor="job_end_date">End Date</label>
                      <Select
                              showSearch
                              placeholder="End date"
                              id="end_month" 
                              value= {hobby.end_month ? month_options.find(option => option.value === hobby.end_month)?.label : undefined}
                            //  value= {hobby.end_month ? month_options[hobby.end_month] : undefined} 
                              onChange={(event) => handleEmployementChange_emp(event, index, "end_month")}   
                              options={month_options}
                       />
              
                    </div>
                    <div className="col-md-6 inputField">
                      <label htmlFor="job_select_endyear">Select Year</label>
                           {/* <DatePicker 
                              picker="year" 
                              placeholder="Select year"
                              id="end_year" 
                              value= {hobby.end_year ? moment(hobby.end_year) : null} 
                              onChange={(event) => handleEmployementChange_emp(event, index, "end_year")}
                          />   */}

                         <Select
                           options={year_options}
                           placeholder="Select year"
                           id="end_year" 
                           value= {hobby.end_year ? hobby.end_year: undefined} 
                           onChange={(event) => handleEmployementChange_emp(event, index, "end_year")}
                  
                           />
                      </div> 
                     </div>  
                   : '' }
                    <div className="row row_employment col-md-12">            
                    <div className="col-md-12 inputField"> 
                    <p className="float-left job-summary">Job Summary</p>
                    </div>
                    <div className="col-md-12 inputField" > 
                      <div className='summary' >
                               {/* <ReactQuill
                                    theme="snow"
                                    value= {hobby.job_summary}
                                    onChange={(event) => handleEmployementChange_emp(event, index, "job_summary")}
                                    placeholder={"Write something awesome..."}
                                    modules={modules} 
                                    style={{height: '250px'}}
                               /> */}
                               <TextArea 
                                    rows={4}
                                    id="job_summary" 
                                    name="job_summary" 
                                    onChange={(event) => handleEmployementChange_emp(event, index, "job_summary")}
                                    placeholder={"Write something awesome..."}
                                    value= {hobby.job_summary}
                              />

{/*                               
                                      <CKEditor
                                          editor={ClassicEditor}
                                          data={hobby.job_summary}
                                          onChange={(event, editor) =>
                                            handleRowChange(index, editor.getData(), 'job_summary')
                                          }
                                        /> */}
                      </div>
                  </div>
                    <div className="col-md-12  inputField">
                      <label htmlFor="job_accomplishments">Job Accomplishments</label>
                   <TextArea rows={2}
                        id="job_accomplishments" 
                        name="job_accomplishments" 
                        value= {hobby.job_accomplishments}
                        onChange={(event) => handleEmployementChange_emp(event, index, "job_accomplishments")} 
                   />
                    </div>
                    
              </div>
              
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          
          </div>
        ))}
        <div >
        
      {!showEmployment && (
        <div className="add_education float-left">
          <button
            type="button"
            className="btn btn-default new-add"
            onClick={handleAddEmployment_emp}
          >
            + Add Employment
          </button>
        </div>
      )}
      {showEmployment && (
        <>
          

          <div className="add_education add_emp_acc float-left">
            <Button
              onClick={handleAddEmployment_emp}
            >
              +  Add one more employment
            </Button>
          </div>

        </>
      )}
         { employment.length !== 0  && ( employment[0].current_company !== '' || employment[0].job_designation !== '' || employment[0].employment_type !== '' || employment[0].start_month !== '' || employment[0].start_year !== '' || employment[0].end_month !== '' || employment[0].end_year !== '' || employment[0].job_summary !== '' || employment[0].job_accomplishments !== '') ?
               <div className="saveBtn-container saveBtn-container-emp"> <Button type="primary" icon={<UploadOutlined />} className="submit-btn" loading={spinLoading}  onClick={mainApi}>Save</Button>
               </div>  : ''
              } 
      </div>
    </div>
    
     {/* ******************** Education HTML Coding ******************** */}

   <div onSubmit={handleSubmit_edu} className="employment">
      <div className="row col-md-12 " >
        <h2 className="resume-title">Education</h2>
        <p className="sub-title">
          A varied education on your resume sums up the value that your
          learnings and background will bring to job.
        </p>
      </div>

      {employment_edu.map((hobby, index) => (
        <div key={index} className="edu-acc">
          <Accordion allowZeroExpanded={true}>
            <AccordionItem>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
              <AccordionItemHeading>
                <AccordionItemButton onClick={() => handleToggleAccordion_edu(index)}>
                {hobby.primary_qualification ? nationalityArray_edu.find(option => option.value === hobby.primary_qualification)?.label : 'Education title'}
                 
                </AccordionItemButton>
              </AccordionItemHeading>
               </div>
               <div>
               <Popconfirm
                     title="Delete the Education Detail"
                     description="Are you sure to delete this education detail?"
                    //  onConfirm={confirm}
                     onConfirm={() => handleDeleteHobby_edu(index)}
                    //  onCancel={cancel}
                     okText="Yes"
                     cancelText="No"
               >
              <Button className="delete-resume"> <i className="fa fa-trash"></i></Button>
            </Popconfirm>
            </div>
            </div>
              <AccordionItemPanel>
                <div className="row row_employment col-md-12">
                  <div className="col-md-6  inputField">
                  <label htmlFor="primary_qualification">Highest Qualification</label>
                <Select
                    id="primary_qualification"
                    value= {hobby.primary_qualification ? nationalityArray_edu.find(option => option.value === hobby.primary_qualification)?.label : undefined}
                    showSearch
                    placeholder="Select primary_qualification"
                    onClick={edu_qualificationP}
                    onChange={(event) => handleCountryChange_edu(event, index, "primary_qualification")}
                    options={nationalityArray_edu}
                   /> 
                  </div>
                  <div className="col-md-6 inputField">
                  <label htmlFor="degree_name">Degree Name</label>
                  <Select
                    showSearch
                     value={hobby.secondary_qualification && hobby.degree ? hobby.degree.find(option => option.value === hobby.secondary_qualification)?.label : undefined}    
                  // value = {hobby.secondary_qualification_name ? hobby.secondary_qualification_name : undefined }
                  //  value={hobby.secondary_qualification && stateArray_edu ? stateArray_edu.find(option => option.value === hobby.secondary_qualification)?.label : undefined}    
                    placeholder="Select Degree"
                    onChange={(event) => handleEmploymentChange_edu(event, index, "secondary_qualification")}
                    options={hobby.degree}
                    autoComplete= 'off'
                   />

                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="specialization">Select Specialization</label>
                  <Dropdown
                          overlay={renderSpecializationMenu_edu}
                          visible={showSpecializationMessage_edu}
                          onVisibleChange={handleSpecializationDropdownVisibleChange_edu}
                       >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a Specialization"
                            onSearch={(e) => edu_specialization(e)}
                            onChange={(event) => handleSpecializationChange_edu(event, index, "specialization")}
                            value= {hobby.specialization ? hobby.specialization : undefined}
                            onMouseLeave={handleCompanyLeave_emp}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                     >
                     {specializationArray_edu.map((option) => (
                         <Select.Option key={option.value} value={option.label}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                      </Dropdown>
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="college_name">College Name</label>
                  <Dropdown
                           overlay={renderCollegeMenu_edu}
                           visible={showCollegeMessage_edu}
                           onVisibleChange={handleCollegeDropdownVisibleChange_edu}
                       >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a College"
                            onSearch={edu_college}
                            onChange={(event) => handleCollegeChange_edu(event, index, "college")}
                            onMouseLeave={handleCompanyLeave_emp}
                            value = {hobby.college ? hobby.college : undefined}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                     >
                     {collegeArray_edu.map((option) => (
                         <Select.Option key={option.value} value={option.label}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                      </Dropdown>

                  </div>
                  <div className="col-md-6 percentage-div">
                    <div className="col-md-5 per-col">
                        <label htmlFor="percentage">Percentage</label>
                        <Input type="number" 
                              id="percentage" 
                              name="percentage" 
                              value= {hobby.percentage}
                              onChange={(event) => handleEmploymentChange_edu(event, index, "percentage")}
                         />
                    </div>
                 
                    <div className="col-md-2 or-text">Or</div>
                    <div className="per-col col-md-5">
                           <label htmlFor="cgpa">CGPA</label>
                           <Input type="number" 
                                 id="cgpa" 
                                 name="cgpa" 
                                 value= {hobby.cgpa}
                                 onChange={(event) => handleEmploymentChange_edu(event, index, "cgpa")}
                           />
                    </div>
                
                  </div>
                  <div className="col-md-6 inputField">
                      <label htmlFor="year_of_complete">Select Year</label>
                           {/* <DatePicker 
                              picker="year" 
                              placeholder="Select year"
                              id="year_of_complete" 
                              value= {hobby.year_of_complete ? moment(hobby.year_of_complete) : null} 
                              onChange={(event) => handleEmploymentChange_edu(event, index, "year_of_complete")}   
                            /> */}

                         <Select
                           options={year_options}
                           placeholder="Select year"
                           id="year_of_complete" 
                           value= {hobby.year_of_complete ? hobby.year_of_complete : undefined} 
                           onChange={(event) => handleEmploymentChange_edu(event, index, "year_of_complete")}   
                       />
                  </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
         
          </div>
        ))}
           { employment_edu.length !== 0  && ( employment_edu[0].primary_qualification !== '' || employment_edu[0].secondary_qualification !== '' || employment_edu[0].specialization !== '' || employment_edu[0].college !== '' || employment_edu[0].percentage !== '' || employment_edu[0].cgpa !== '' || employment_edu[0].year_of_complete !== '' ) ?
               <div className="saveBtn-container"> <Button type="primary" icon={<UploadOutlined />} className="submit-btn" loading={spinLoading}  onClick={mainApi}>Save</Button>
               </div>  : ''
              }  
      {!showEmployment_edu && (
        <div className="add_education float-left">
          <Button
             onClick={handleAddEmployment_edu}
          >
            + Add Employment
          </Button>
        </div>
      )}
      {showEmployment_edu && (
        <>
          <div className="add_education add_education_acc float-left">
            <Button
               onClick={handleAddEmployment_edu}
            >
              +  Add one more education
            </Button>
          </div>

        </>
      )}
    </div>

    {/* ******************* Certification HTML Coding **************** */}
    <div onSubmit={handleSubmit_certi} className="employment">
      <div className="row col-md-12 " >
        <h2 className="resume-title">Certifications Details</h2>
        <p className="sub-title">     
             Certification details on your resume highlight the specialized 
             knowledge and skills you have acquired through specific certifications.
        </p>
      </div>
      {employment_certi.map((hobby, index) => (
        <div key={index} className="add_education_certi_acc" >
          <Accordion allowZeroExpanded={true}>
            <AccordionItem>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
              <AccordionItemHeading>
                <AccordionItemButton onClick={() => handleToggleAccordion_certi(index)}>
              {hobby.certificate_name ? hobby.certificate_name : 'Certificate title'} 
              </AccordionItemButton>
              </AccordionItemHeading>
               </div>
               <div>
               <Popconfirm
                     title="Delete the Certificate Detail"
                     description="Are you sure to delete this certificate detail?"
                    //  onConfirm={confirm}
                     onConfirm={() => handleDeleteHobby_certi(index)}
                     //  onCancel={cancel}
                     okText="Yes"
                     cancelText="No"
               >
              <Button className="delete-resume"> <i className="fa fa-trash"></i></Button>
            </Popconfirm>
            </div>
            </div>
              <AccordionItemPanel>
                <div className="row row_employment col-md-12">
                  <div className="col-md-6  inputField">
                    <label htmlFor="certificate_name">Certification Name</label>
                    <Input type="text" 
                    id="certificate_name" 
                    name="certificate_name" 
                    placeholder="Enter Course Name"
                    value= {hobby.certificate_name}
                    onChange={(event) => handleEmployementChange_certi(event, index, "certificate_name")}
                    />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="vendor">Vendor</label>
                      <Dropdown
                           overlay={renderVendorMenu_certi}
                           visible={showVendorMessage_certi}
                           onVisibleChange={handleVendorDropdownVisibleChange_certi}
                       >
                     <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a Company"
                            onSearch={(e) => certi_vendor(e)}
                            onChange={(event) => handleVendorChange_certi(event, index, "certificate_vendor")}
                           // onChange= {(event) => handleVendorChangeDD(event, index, "certificate_vendor")}
                            value = {hobby.certificate_vendor ? hobby.certificate_vendor : undefined}
                            onMouseLeave={handleCompanyLeave_emp}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                            // dropdownRender={(menu) => {
                            //   // Only render the dropdown menu if there are options available
                            //   if (menu && menu.props && menu.props.children && menu.props.children.length > 0) {
                            //     return menu;
                            //   }
                            //   return null;
                            // }}
                     >
                     {vendorArray_certi.map((option) => (
                         <Select.Option key={option.value} value={option.value}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                      </Dropdown>
                  </div>
                 
                  <div className="col-md-6 inputField">
                    <label htmlFor="technology">Technology</label>
                    <Dropdown
                           overlay={renderTechnologyMenu_certi}
                           visible={showTechnologyMessage_certi}
                           onVisibleChange={handleTechnologyDropdownVisibleChange_certi}
                       >
                     <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a Technology"
                            onSearch={(e) => certi_technology(e)}
                            onChange={(event) => handleTechnologyChange_certi(event, index, "certificate_technology")}
                            value = {hobby.certificate_technology ? hobby.certificate_technology : undefined}
                            onMouseLeave={handleCompanyLeave_emp}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                            // dropdownRender={(menu) => {
                            //   // Only render the dropdown menu if there are options available
                            //   if (menu && menu.props ) {
                            //     console.log(menu, "dropdown menu")
                            //     return menu;
                            //   }
                            //   return null;
                            // }}
                     >
                     {technologyArray_certi.map((option) => (
                         <Select.Option key={option.value} value={option.value}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                    </Dropdown>
                  </div>
                  <div className="col-md-6 inputField">
                      <label htmlFor="job_select_year">Select Year</label>
                          <Select
                              showSearch
                              placeholder="Select year"
                              id="job_start_date" 
                              value= {hobby.certificate_complete_yr ? hobby.certificate_complete_yr: undefined} 
                              onChange={(event) => handleEmployementChange_certi(event, index, "certificate_complete_yr")}  
                              options={year_options}
                         />  
                          
                  </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
           { employment_certi.length !== 0  && ( employment_certi[0].certificate_complete_yr !== '' || employment_certi[0].certificate_name  !== '' || employment_certi[0].certificate_technology !== '' || employment_certi[0].certificate_vendor !== '') ?
               <div className="saveBtn-container"> <Button type="primary" icon={<UploadOutlined />} className="submit-btn" loading={spinLoading}  onClick={mainApi}>Save</Button>
               </div>   : ''
              }  
      {!showEmployment_certi && (
        <div className="add_education  float-left">
          <button
            type="button"
            className="btn btn-default new-add"
            onClick={handleAddEmployment_certi}
          >
            + Add Course
          </button>
        </div>
      )}
      {showEmployment_certi && (
        <>
          <div className="add_education add_certi_acc float-left">
            <Button
               onClick={handleAddEmployment_certi}
            >
              +  Add one more Certificate
            </Button>
          </div>

        </>
      )}
    </div>

      {/* *******************Course  HTML Coding **************** */}

      <div onSubmit={handleSubmit_course} className="employment">
      <div className="row col-md-12 " >
        <h2 className="resume-title">Course Details</h2>
        <p className="sub-title">Course details on your resume outline the relevant courses or training programs 
          you have completed to enhance your skills and knowledge in specific areas.</p>
      </div>
      {employment_course.map((hobby, index) => (
        <div key={index}  className="add_education-course-acc">
          <Accordion allowZeroExpanded={true}>
            <AccordionItem>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
              <AccordionItemHeading>
                <AccordionItemButton onClick={() => handleToggleAccordion_course(index)}>
                {hobby.course_name ? hobby.course_name : 'Course title'} 
               </AccordionItemButton>
              </AccordionItemHeading>
               </div>
               <div>
               <Popconfirm
                     title="Delete the Course Detail"
                     description="Are you sure to delete this course detail?"
                    //  onConfirm={confirm}
                     onConfirm={() => handleDeleteHobby_course(index)}
                     //  onCancel={cancel}
                     okText="Yes"
                     cancelText="No"
               >
              <Button className="delete-resume"> <i className="fa fa-trash"></i></Button>
            </Popconfirm>
            </div>
            </div>
              <AccordionItemPanel>
                <div className="row row_employment col-md-12">
                  <div className="col-md-6  inputField">
                    <label htmlFor="course_name">Course Name</label>
                    <Input type="text" 
                    id="course_name" 
                    name="course_name" 
                    placeholder="Enter Course Name"
                    value= {hobby.course_name}
                    onChange={(event) => handleEmploymentChange_course(event, index, "course_name")}
                    />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="vendor">Vendor</label>
                    {/* <Input type="text" 
                    id="vendor" 
                    name="vendor" 
                    value= {employment.vendor}
                    onChange={(event) => handleEmployementChange(event, index, "vendor")}
                    /> */}
                       <Dropdown
                           overlay={renderVendorMenu_course}
                           visible={showVendorMessage_course}
                           onVisibleChange={handleVendorDropdownVisibleChange_course}
                       >
                     <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a Company"
                            onSearch={(e) => course_vendor(e)}
                            onChange={(event) => handleVendorChange_course(event, index, "course_vendor")}
                            value={hobby.course_vendor ? hobby.course_vendor : undefined}
                            onMouseLeave={handleCompanyLeave_emp}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                     >
                     {vendorArray_course.map((option) => (
                         <Select.Option key={option.value} value={option.value}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                      </Dropdown>
                  </div>
                 
                  <div className="col-md-6 inputField">
                    <label htmlFor="technology">Technology</label>
                    {/* <Input type="text" 
                    id="technology" 
                    name="technology" 
                    value= {employment.technology}
                    onChange={(event) => handleEmployementChange(event, index, "technology")}
                    /> */}
                    
                    <Dropdown
                           overlay={renderTechnologyMenu_course}
                           visible={showTechnologyMessage_course}
                           onVisibleChange={handleTechnologyDropdownVisibleChange_course}
                       >
                     <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search for a Technology"
                            onSearch={(e) => course_technology(e)}
                            onChange={(event) => handleTechnologyChange_course_course(event, index, "course_technology")}
                            value={hobby.course_technology ? hobby.course_technology : undefined}
                            onMouseLeave={handleCompanyLeave_emp}
                            showSearch // Enable searching
                            autoComplete="off" // Disable autocomplete
                     >
                     {technologyArray_course.map((option) => (
                         <Select.Option key={option.value} value={option.value}>
                              {option.label}
                         </Select.Option>
                    ))}
                    </Select>
                    </Dropdown>

                  </div>
                  <div className="col-md-6 inputField">
                      <label htmlFor="job_select_year">Select Year</label>    
                            {/* <DatePicker 
                                  picker="year" 
                                  placeholder="Select year"
                                  id="course_complete_yr" 
                                  value={hobby.course_complete_yr ? moment(hobby.course_complete_yr) : null}
                                  onChange={(event) => handleEmploymentChange_course(event, index, "course_complete_yr")}   
                               /> */}
                               <Select 
                                placeholder="Select year"
                                id="course_complete_yr" 
                                value={hobby.course_complete_yr ? hobby.course_complete_yr : undefined}
                                onChange={(event) => handleEmploymentChange_course(event, index, "course_complete_yr")}   
                                options={year_options}
                               />
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="course_duration">Course Duration </label>
                    <Input type="number" 
                    id="course_duration" 
                    name="course_duration" 
                    placeholder="In days"
                    value= {hobby.course_duration}
                    onChange={(event) => handleEmploymentChange_course(event, index, "course_duration")}
                    />
                  </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}

        { employment_course.length !== 0  && ( employment_course[0].course_name !== '' || employment_course[0].course_complete_yr !== '' || employment_course[0].course_duration !== '' || employment_course[0].course_technology !== '' || employment_course[0].course_vendor !== '') ?
               <div className="saveBtn-container"> <Button type="primary" icon={<UploadOutlined />} className="submit-btn" loading={spinLoading}  onClick={mainApi}>Save</Button>
               </div>  : ''
              }  
      {!showEmployment_course && (
        <div className="add_education  float-left">
          <button
            type="button"
            className="btn btn-default new-add"
            onClick={handleAddEmployment_course}
          >
            + Add Course
          </button>
        </div>
      )}
      {showEmployment_course && (
        <>
          <div className="add_education add_education-course float-left">
            <Button
               onClick={handleAddEmployment_course}
            >
              +  Add one more Course
            </Button>
          </div>

        </>
      )}
    </div>
      
      {/* *******************Project  HTML Coding **************** */}
      <form onSubmit={handleSubmit((data) => {
        console.log(data, "handleSubmitPro_errorsssss")
      })}>
      
      <div  className="employment">
      <div className="row col-md-12 " >
        <h2 className="resume-title">Project Details</h2>
        <p>Project details on your resume showcase the projects you have worked on, 
          highlighting your role, responsibilities, and accomplishments.</p>
      </div>
      {employment_pro.map((hobby, index) => (
        <div key={index} className="add_education-course-acc">
          <Accordion allowZeroExpanded={true}>
            <AccordionItem>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
              <AccordionItemHeading>
                <AccordionItemButton onClick={() => handleToggleAccordion_pro(index)}>
                 {hobby.project_name ? hobby.project_name : 'Project title' } 
                 </AccordionItemButton>
              </AccordionItemHeading>
               </div>
               <div>
               <Popconfirm
                     title="Delete the Project Detail"
                     description="Are you sure to delete this project detail?"
                    //  onConfirm={confirm}
                     onConfirm={() => handleDeleteHobby_pro(index)}
                     //  onCancel={cancel}
                     okText="Yes"
                     cancelText="No"
               >
              <Button className="delete-resume"> <i className="fa fa-trash"></i></Button>
            </Popconfirm>
            </div>
            </div>
             <AccordionItemPanel>
                <div className="row row_employment col-md-12">
                  <div className="col-md-6  inputField">
                    <label htmlFor="project_name">Project Name</label>
                    <Input 
                    type="text"
                    placeholder="Enter Project Name" 
                    id="project_name" 
                    name="project_name" 
                    value= {hobby.project_name}
                    onChange={(event) => handleEmployementChange_pro(event, index, "project_name")}
                    // {...register(`project_name_${index}`, {required: 'Project name is required'} )}
                  />
                  {/* <Input 
                     type="text"
                     placeholder="Enter Project Name" 
                     id="project_name" 
                     name="project_name" 
                     value={hobby.project_name}
                     onChange={(event) => {
                        handleEmployementChange_pro(event, index, "project_name");
                        register('project_name')(event); // Manually trigger the register function
                      }}
                    /> */}
                  {errors?.project_name && <p>{errors.project_name.message}</p>}
                  </div>
                  <div className="col-md-6 inputField">
                    <label htmlFor="project_for">Project For</label>
                  <Select
                    showSearch
                    placeholder="--Select--"
                    id= "project_for"
                    value= {hobby.project_for ? hobby.project_for : undefined}
                    onChange={(event) => handleEmployementChange_pro(event, index, "project_for")}
                    options={ Project_options }
                    autoComplete= 'off'
                    required
                   />
                  </div>
                 
                  <div className="col-md-6 inputField">
                      <label htmlFor="project_complete_yr">Select Year</label>
                        <Select
                              showSearch
                              placeholder="Select year"
                              id="project_complete_yr" 
                              value= {hobby.project_complete_yr ? hobby.project_complete_yr : undefined} 
                              onChange={(event) => handleEmployementChange_pro(event, index, "project_complete_yr")}  
                              options={year_options}
                              required
                         /> 
                  </div>
                  </div>
                  <div className="row row_employment col-md-12">
                       <div className="col-md-12 inputField">
                           <label htmlFor="technology">Project Summary</label>
                                <TextArea type="text" 
                                      id="project_summary" 
                                      name="project_summary" 
                                      value= {hobby.project_summary}
                                      onChange={(event) => handleEmployementChange_pro(event, index, "project_summary")}
                                      required
                              /> 
                        </div>
                  </div> 
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}

        { employment_pro.length !== 0  && ( employment_pro[0].project_name !== '' || employment_pro[0].project_for !== '' || employment_pro[0].project_complete_yr !== '' || employment_pro[0].project_summary !== '') ?
               <div className="saveBtn-container"> <Button type="primary" icon={<UploadOutlined />} className="submit-btn" loading={spinLoading}  onClick={mainApi}>Save</Button>
               </div>  : ''
              }  
          
      {!showEmployment_pro && (
        <div className="add_education float-left">
          <button
            type="button"
            className="btn btn-default new-add"
            onClick={handleAddEmployment_pro}
          >
            + Add Course
          </button>
        </div>
      )}
      {showEmployment_pro && (
        <>
          

          <div className="add_education add_education-course float-left">
            <Button
              onClick={handleAddEmployment_pro}
            >
              +  Add one more Project
            </Button>
          </div>

        </>
      )}
    </div>
    </form>

      {/* *******************Hobbies  HTML Coding **************** */}
      <div className="job-skills">
       <div className="row col-md-12 " >
        <div className='col-md-12'>
        <h2 className="resume-title">Hobbies</h2>
           <Select
                mode="tags"
                style={{
                     width: '100%',
                }}
                value={hobbies_hob}
                onSearch = {(e) => hobby_getapi(e)}
                onChange = {handleHobbiesChange_hob}
                placeholder="Search for Hobbies"
                options={vendorArray_hob}
          />
        </div>   
        {/* { hobbies_hob.length !== 0 ?
               <Button type="primary"  loading={spinLoading} className="submit-btn" onClick={mainApi}>Save</Button>
               : ''
              }   */}
       </div>
          
    </div>
      
      {/* *******************Skills  HTML Coding **************** */}

      <div className="job-skills">
       <div className="row col-md-12 " >
        <div className='col-md-12'>
        <h2 className="resume-title">Skills</h2>
           <Select
                
                mode="tags"
                style={{
                     width: '100%',
                }}
                value={skills_skill}
                onSearch ={(e) => skills_getapi(e)}
                onChange={handleSkillsChange_skill}
                placeholder="Search for Skills"
                options={vendorArray_skill}
          />
        </div>   
        {/* { skills_skill.length !== 0 ?
               <Button type="primary"  loading={spinLoading} className="submit-btn" onClick={mainApi}>Save</Button>
               : ''
              }    */}
       </div>
     
          
    </div>
      
      {/* ******************* Languages  HTML Coding **************** */}

      <div className="job-skills">
     <div className="row col-md-12 " >
     <div className='col-md-12'>
     <h2 className="resume-title">Languages</h2>
     <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      value={languages_lang}
      onChange={handleLanguagesChange_lang}
      onSearch={(e) => lang_getapi(e)}
      placeholder="Search for Languages"
      options={vendorArray_lang}
    />
     </div>  
     {/* { languages_lang.length !== 0 ?
               <Button type="primary"  loading={spinLoading} className="submit-btn" onClick={mainApi}>Save</Button>
               : ''
              }  */}
    </div>     
   </div>
 

   {/* Check DD */}

 

          {/* <Employment detail={handleEmploymentDetailMemoized} /> 
          <EducationForm detail={handleEducationDetailMemoized} />
          <CourseForm detail={handleCourseDetailMemoized}/>
          <CertificationForm detail={handleCertificationDetailMemoized}/>
          <ProjectForm detail={handleProjectDetailMemoized} />
          <Skills detail={handleSkillsDetailMemoized} />
          <Languages detail={handleLanguagesDetailMemoized} />
          <Hobbies detail={handleHobbiesDetailMemoized} />;  */}
      

 
        </div>
        <div
          className="col-md-6 resume-builder-right"  style={{ right: 0, height: "100vh" }}
          
        >

       {/* <BasicDocument  name={name} email={email} mobile={mobile}
           dob={dob} nationality ={nationality} is_experience={is_experience} notice_period={ notice_period}
           year_experience={year_experience} ctc={ctc} ectc={ectc} opportunity={opportunity}
           profile_title={profile_title} address={address} city={city} state={state} pincode={pincode} experience_summary={experience_summary} 
           employment={employment} hobbies_hob={hobbies_hob} languages_lang={languages_lang} skills_skill={skills_skill}
           lang_array = {vendorArray_lang} employment_edu = {employment_edu} employment_certi={employment_certi} employment_course={employment_course} 
           employment_pro={employment_pro} degrees_p = {nationalityArray_edu} degrees_s = {stateArray_edu} states_g = {stateArray} cities_g = {cityArray}
       
          /> */}
          {/* <Testpdf /> */}
        </div>
      
      </div>
}
    </div>
    </>
  );
        }

export default ResumeBuilder;
