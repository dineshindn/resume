import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import Avatar from "../../assets/avatar.png";
import rudhra from "../../assets/rudhra.jpg";



// Create styles
const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "row",
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  page1: {
    width: "35%", // Set the width to 50% to display two pages side by side
    height: "100%",
    padding: 10,
    boxSizing: "border-box",
  },
  page2: {
    width: "63%", // Set the width to 50% to display two pages side by side
    height: "100%",
    padding: 10,
    boxSizing: "border-box",
  },
  section: {
    // marginLeft: 20,
    // marginTop: 20,
    // marginRight: 20,
    // marginBottom: 10,
    // padding: 10,
    width: "100%",
  },
  viewer: {
    width: "100%", // The pdf viewer will take up all of the width and height
    height: "100vh",
    overflow: "hidden", // Prevent scrolling
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  head: {
    fontSize: 12,
    borderBottom: "2px solid #aaa",
    marginTop: 20,
  },
  paragraph: {
    fontSize: 12,
    // marginBottom: 10,
    // marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 10,
  },
  background_black: {
    backgroundColor: "#313c4e",
    color: "#fff",
    padding: "20px 10px 20px 20px",
  },
  logo_title: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "1.3em",
  },
  logo_title_sub: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
  },
  right_title: {
    color: "#606263",
    marginTop: "5px",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "1.3em",
    borderBottom: "1px solid #313c4e",
    marginBottom: "10px",
  },
  listItem: {
    fontSize: 12,
    // marginLeft: 20,
    // marginRight: 10,
    backgroundColor: "#313c4e",
    padding: "5px 5px 5px 5px",
    borderRadius: "7px",
    color: "#fff",
    marginRight: "10px",
    marginTop: "5px",
  },

  headerText: {
    fontSize: 14,
    color: "#333333",
  },
  pseudoElementBefore: {
    position: "relative",
    top: "-1px",
    right: "9px",
    content: "",
    height: "15px",
    width: "15px",
    border: "1px solid #979797",
    borderRadius: "100%",
    background: "#dbe1e5",
    "z-index": 1,
  },
  pseudoElementAfter: {
    position: "relative",
    content: '""',
    width: 10,
    height: 10,
    backgroundColor: "blue",
    bottom: 0,
    right: -10,
  },

  // NEW

  verticalLine: {
    height: "auto",
    borderLeft: "1px solid #000900",
    position: "relative",
    marginRight: "0px",
    padding: "0px 0px 0px 0px",
  },
  verticalLineMargin: {
    marginTop: "-25px",
    padding: "5px 5px 15px 25px",
  },
  h2: {
    fontWeight: 600,
    fontSize: "14px",
  },
  rightH2: {
    fontStyle: "italic",
    float: "right",
    fontSize: "11px",
    color: "gray",
    flex: 1,
    fontWeight: "500",
    lineHeight: 1.2,
    textAlign: "right",
  },

  rightH2_top: {
    fontStyle: "italic",
    float: "right",
    fontSize: "11px",
    color: "gray",
    flex: 1,
    fontWeight: "500",
    lineHeight: 1.2,
    textAlign: "right",
    marginTop: "2px",
  },

  italic: {
    fontStyle: "italic",
    color: "gray",
    fontSize: "16px",
  },
});

// Create Document Component
function BasicDocument(props) {
  console.log(props.employment, props.name, "emp");

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document */}
      <Document style={styles.document}>
        {/* Render multiple pages */}
        <Page style={styles.page} size="A4">
        <View style={styles.pageContainer}>
<View style={styles.page1}>
  <View style={styles.section}>
    <Image style={styles.image} src={rudhra} alt="Image" />

    {/* Skills */}
    <Text style={styles.right_title}>Skills</Text>

    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {props.skills_skill.map((hby, index) => (
        <Text key={index} style={styles.listItem}>
          {hby}
        </Text>
      ))}
    </View>

    {/* Language */}
    <Text style={styles.right_title}>Certificates</Text>
   
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
         {props.employment_certi.map((emp, index) => (
        <Text key={index} style={styles.listItem}>
          {emp.certificate_name}
        </Text>
      ))}
    </View>

 <Text style={styles.right_title}>Courses</Text>

   <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {props.employment_course.map((emp, index) => (
        <Text key={index} style={styles.listItem}>
            {emp.course_name}
        </Text>
      ))}
    </View>
  
    <Text style={styles.right_title}>Languages</Text>

    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {props.languages_lang.map((hby, index) => (
        <Text key={index} style={styles.listItem}>
          {hby}
        </Text>
      ))}
    </View>

    {/* Hobbies */}

    <Text style={styles.right_title}>Hobbies</Text>

    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {props.hobbies_hob.map((hby, index) => (
        <Text key={index} style={styles.listItem}>
          {hby}
        </Text>
      ))}
    </View>

    {/*  */}
  </View>
</View>
{/* Right hand side */}
<View style={styles.page2}>

<View>
<Text>
  <div dangerouslySetInnerHTML={{ __html: `<ol>
    <li>What's the difference between a CV and a resume?</li>
  </ol>
  <ul>
    <li>In the EU, the words "CV" and "resume" are used interchangeably</li>
  </ul>
  <ol>
    <li>In the United States, however, a resume is a document you use to apply for jobs, while a CV is mainly used by academics.</li>
  </ol>
  <ul>
    <li>Want to learn more? Check out our article on the differences between CVs and resumes.</li>
  </ul>
  <p>
    Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities, and skills.
  </p>` }} />
</Text>
</View>

  {/*  */}
  <View style={[styles.section, styles.background_black]}>
    <Text style={styles.logo_title}> {props.name} </Text>
    <Text style={styles.logo_title_sub}>
      {" "}
      {props.profile_title}{" "}
    </Text>
    <Text style={styles.paragraph}>
      {props.mobile} , {props.email} {props.city ? "," : ""}{" "}
      {props.city ? props.cities_g.find(option => option.value ===  props.city)?.label: undefined} 
      {props.state ? "," : ""}{" "}
      {props.state ? props.states_g.find(option => option.value === props.state)?.label : undefined} {props.pincode ? "," : ""} {props.pincode}
    </Text>
  </View>

  {/* Experience Summary */}

  <Text style={styles.right_title}>Experience Summary</Text>
  
  
  <Text>
        xdscdsc
  <div>Dinesh</div>


  </Text>
  <Text style={styles.paragraph}>{props.experience_summary}</Text>

  {/* Experience Details */}
  <Text style={styles.right_title}>Experience Details</Text>
  {props.employment.map((emp, index) => (
    <View>
      <View style={styles.pseudoElementBefore}> </View>
      <View style={styles.verticalLine}>
        <View style={styles.verticalLineMargin}>
          <Text style={styles.rightH2}>
            {emp.start_month}-{emp.start_year} - {emp.end_month}-
            {emp.end_year}
          </Text>
          <Text>{emp.current_company}</Text>
          <Text>{emp.job_designation}</Text>
          {/* <Text style={styles.rightH2}>21 yr, 8 mos</Text> */}
          <Text style={styles.paragraph}>Job Summary:</Text>
          <View>
            <Text>{emp.job_summary}</Text>
          </View>
          <Text style={styles.paragraph}>
            Major Accomplishments:
          </Text>
          <View>
            <Text>{emp.job_accomplishments}</Text>
          </View>
        </View>
      </View>
    </View>
  ))}

  {/* Educational Details */}

  <Text style={styles.right_title}>Educational Details</Text>

  {props.employment_edu.map((emp, index) => (
    <View>
      <View style={styles.pseudoElementBefore}> </View>
      <View style={styles.verticalLine}>
        <View style={styles.verticalLineMargin}>
          <Text style={styles.rightH2_top}>
            {emp.year_of_complete}
          </Text>
          <Text style={styles.h2}>
          {/* value= {hobby.employment_type ? employment_type_options.find(option => option.value === hobby.employment_type)?.label : undefined} */}
          {emp.secondary_qualification ? emp.degree.find(option => option.value === emp.secondary_qualification)?.label : undefined} - {emp.specialization}  {/* {emp.secondary_qualification} - {emp.specialization} */}
          </Text>
          {/* <Text style={styles.rightH2}></Text> */}
          <Text style={{ fontStyle: "italic", color: "gray" }}>
            {emp.college}
          </Text>
          <Text style={styles.paragraph}>
            Percentage: {emp.percentage} %
          </Text>
        </View>
      </View>
    </View>
  ))}

  {/* Project Details */}
  <Text style={styles.right_title}>Project Details</Text>

  {props.employment_pro.map((emp, index) => (
    <View>
      <View style={styles.pseudoElementBefore}> </View>
      <View style={styles.verticalLine}>
        <View style={styles.verticalLineMargin}>
          <Text style={styles.rightH2_top}>
            {emp.project_complete_yr}
          </Text>
          <Text style={styles.h2}>{emp.project_name}</Text>
          {/* <Text style={styles.rightH2}></Text> */}
          <Text style={{ fontStyle: "italic", color: "gray" }}>
            {emp.project_for}
          </Text>

          <Text style={styles.paragraph}>Project Summary:</Text>
          <View>
            <Text>{emp.project_summary}</Text>
          </View>
        </View>
      </View>
    </View>
  ))}

  {/* Course Details */}

  <Text style={styles.right_title}>Course Details</Text>

  {props.employment_course.map((emp, index) => (
    <View>
      <View style={styles.pseudoElementBefore}> </View>
      <View style={styles.verticalLine}>
        <View style={styles.verticalLineMargin}>
          <Text style={styles.rightH2_top}>
            {emp.course_complete_yr}
          </Text>
          <Text style={styles.h2}>
            {emp.course_name} - {emp.course_technology}
          </Text>
          <Text style={{ fontStyle: "italic", color: "gray" }}>
            {emp.course_vendor}
          </Text>
        </View>
      </View>
    </View>
  ))}

  {/* Certifications Details */}

  <Text style={styles.right_title}>Certifications Details</Text>

  {props.employment_certi.map((emp, index) => (
    <View>
      <View style={styles.pseudoElementBefore}> </View>
      <View style={styles.verticalLine}>
        <View style={styles.verticalLineMargin}>
          <Text style={styles.rightH2_top}>
            {emp.certificate_complete_yr}
          </Text>
          <Text style={styles.h2}>
            {emp.certificate_name} - {emp.certificate_technology}
          </Text>
          <Text style={{ fontStyle: "italic", color: "gray" }}>
            {emp.certificate_vendor}
          </Text>
        </View>
      </View>
    </View>
  ))}
</View>
{/* Right hand side end */}
</View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default BasicDocument;
