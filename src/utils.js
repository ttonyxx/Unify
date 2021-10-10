import { db } from './firebase'
import {collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore"; 

export async function addUser(information)
{
  try {
    const docRef = await setDoc(doc(db, "users", information.email), information);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUser(email)
{
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let user;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  })
  return user;
  //getUser('tonyxin@berkeley.edu').then((value) => console.log(value))
}

export async function filterMajor(major)
{
  let user;
  var array = [];

  const q = query(collection(db, "users"), where("major", "==", major), where("type", "==", "college"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = doc.data();
    array.push(user);
  })
  return array;
}

export async function filterCollege(college)
{
  let user;
  var array = [];

  const q = query(collection(db, "users"), where("college", "==", college), where("type", "==", "college"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = doc.data();
    array.push(user);
  })
  return array;
}

export async function filterName(name)
{
  let user;
  var array = [];

  const q = query(collection(db, "users"), where("type", "==", "college"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let fullName = doc.data().firstName + " " + doc.data().lastName;
    if(fullName.includes(name))
    {
      user = doc.data();
      array.push(user);
    }
  })
  return array;
}

export async function getRecommended(user)
{
  let temp;
  var array = [];

  let q = query(collection(db, "users"), where("major", "in", user.majorInterest), where("type", "==", "college"));
  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp = doc.data();
    array.push(temp);
  })

  let p = query(collection(db, "users"), where("college", "in", user.collegeList), where("type", "==", "college"));
  let secondSnapshot = await getDocs(p);
  secondSnapshot.forEach((doc) => {
    temp = doc.data();
    if(!array.includes(temp))
      array.push(temp);
  })

  shuffle(array)
  return array;
  
}

export async function getCollegeRecommended(user) {
  let temp;
  var array = [];

  let p = query(collection(db, "users"), where("college", "in", user.collegeList), where("type", "==", "college"));
  let secondSnapshot = await getDocs(p);
  secondSnapshot.forEach((doc) => {
    temp = doc.data();
    if(!array.includes(temp))
      array.push(temp);
  })

  shuffle(array)
  return array;
}

export async function getMajorRecommended(user) {
  let temp;
  var array = [];

  let q = query(collection(db, "users"), where("major", "in", user.majorInterest), where("type", "==", "college"));
  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp = doc.data();
    array.push(temp);
  })

  shuffle(array)
  return array;
}

export async function setMajors(email, array)
{
  const ref = doc(db, 'users', email);
  setDoc(ref, { majorInterests: array }, { merge: true });
}

export async function setColleges(email, array)
{
  const ref = doc(db, 'users', email);
  setDoc(ref, { collegeList: array }, { merge: true });
}

export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
