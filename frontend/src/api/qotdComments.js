import { supabase } from "../supabaseClient";

const KEY = "weshare_qotd_comments_v1";


async function readAll() {
  try {
    const response = await fetch (`http://127.0.0.1:5000/commentRetrieve`); //object
    const data = await response.json();
    console.log("the data is " + data)
    return data;
  } catch {
    return [];
  }
}

//I believe writeAll is to display all the comments including ur newly added comment
//then wldn't readAll be enough??


// Load comments (based on userName) : if based on timecreated for comment then need extra column in table
export async function listQotdComments() {
  const { data: { user } } = await supabase.auth.getUser();
  const all = await readAll();

  all.forEach(c => {
    if (c.id === user.id) {
      c.userName = "You";
    }
  });

  return all.sort((a, b) => {
    if (a.userName === "You") {
      return -1;
    } 
    if (b.userName === "You") {
      return 1;
    }
    
    return (b.userName ?? "").localeCompare(a.userName ?? "");
  });
}

// Create a comment
export async function createQotdComment({ text}) {
  //do the fetch for insert into database
  //then call the listQotdComments i think? Idk the purpose of writeAll ( i think it is to just update local database)
  //actually wait i think readall wld have displayed all the msgs in database
  //then here i insert this new comment into dtaabase and can just return this new comment alone
  const { data: { user } } = await supabase.auth.getUser();
  const userID = user.id 
  try {
    await fetch(`http://127.0.0.1:5000/comment/${userID}/${text}`);
    const newComment = {
      id: userID,
      userName: "You",
      comment: text
    }
    return newComment;
  } catch {
    console.log("Could not insert user comment into database succesfully")
  }

}

