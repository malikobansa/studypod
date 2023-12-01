import { request, gql } from 'graphql-request';
const MASTER_URL="https://api-eu-west-2.hygraph.com/v2/clpfgqlakm2py01t79h7ufwqt/master";

export const getCourseList=async(level)=>{
    const query=gql`
    query CourseList {
        courses(where: {level: `+level+`}) {
          id
          name
          level
          price
          time
          tags
          chapters {
            id
            content {
                markdown
              }
              output {
                markdown
                html
              }
              title
          }
          author
          banner {
            url
          }
          description {
            markdown
            html
          }
        }
      }
    `
    
    const result= await request(MASTER_URL,query)
      return result
}

export const enrollCourse=async(courseId,userEmail)=>{
    const mutationQuery=gql`
    mutation MyMutation {
        createUserEnrolledCourse(
          data: {courseId: "`+courseId+`", userEmail: "`+userEmail+`", course: {connect: {id: "`+courseId`"}}}
        ) {
          id
        }
        publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
    const result= await request(MASTER_URL,mutationQuery)
    return result
}

export const getUserEnrolledCourse=async(courseId,userEmail)=>{
    const query=gql`
    query GetUserEnrolledCourse {
        userEnrolledCourses(
          where: {courseId: "`+courseId+`", userEmail: "`+userEmail+`"}
        ) {
          id
          courseId
          completedChapter {
            chapterId
          }
        }
      }
    `

    const result = await request(MASTER_URL,query);
    return result;
}

export const MarkChapterCompleted=async(chapterId,recordId)=>{
  const mutationQuery=gql`
  mutation markChapterCompleted {
    updateUserEnrolledCourse(
      data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
      where: {id: "`+recordId+`"}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection {
      edges {
        node {
          id
        }
      }
    }

    updateUserDetail(where: {email: "`+userEmail+`"},{
      data: {point : `+points`}
    }){
      point
    }

    publishUserDetail(where: {email: "`+email+`"}){
      id
    }
  }
  `

  const result = await request(MASTER_URL,mutationQuery);
  return result;
}

export const createNewUser = async(userName, email,profileImageUrl)=>{
  const mutationQuery=gql`
  mutation CreateNewUser{
    upsertUserDetail(
      upsert: { create:
      {email:"`+email+`",
      point:10,
      profileImage:"`+profileImageUrl+`",
      userName: "`+userName+`"},
      update: {email: "`+email+`",
        profileImage:
        "`+profileImageUrl+`", userName: "abc"}}
        where: {email: "`+email+`"}
    ) {
      id
    }
  }
  `
  const result = await request(MASTER_URL,mutationQuery);
  return result;
}

export const getUserDetail=async(email)=>{
  const query=gql`
  query getUserDetails{
    userDetail(where:
      {email: "`+email+`"}){
        point
      }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const GetAllUsers =async()=>{
  const query =gql`
  query GetAllUsers {
    userDetails(orderBy: point_DESC) {
      id
      point
      userName
      profileImage
    }
  }
  `

  const result = await request(MASTER_URL,query);
  return result;
}

export const GetAllProgressCourse=async(userEmail)=>{
  const query = gql`
  query GetAllUserEnrolledProgressCourse {
    userEnrolledCourses(where: {userEmail: "`+userEmail+`"}) {
      completedChapter {
        chapterId
      }
    course {
      banner {
        url
      }
      chapters {
        id
      }
      description {
        markdown
      }
      id
      name
      price
      level
      time
      title
      content{
        heading
        description{
          markdown
          html
        }
        output{
          markdown
          html
        }
      }
    }
  }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}