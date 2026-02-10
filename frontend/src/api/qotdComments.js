const KEY = "weshare_qotd_comments_v1";



async function readAll(user) {
  const userName = user.userName 
  try {
    const response = await fetch (`http://127.0.0.1:5000/commentRetrieve/${userName}`); //object
    const data = await response.json();
    console.log("the data is " + data.status)
    return data;
  } catch {
    return [];
  }
}

//I believe writeAll is to display all the comments including ur newly added comment
//then wldn't readAll be enough??


// Load comments (based on userName) : if based on timecreated for comment then need extra column in table
export async function listQotdComments(user) {
  const all = await readAll(user);
  return all.sort((a, b) => b.userName.localeCompare(a.userName));
}

// Create a comment
export async function createQotdComment({ text , user}) {
  //do the fetch for insert into database
  //then call the listQotdComments i think? Idk the purpose of writeAll ( i think it is to just update local database)
  //actually wait i think readall wld have displayed all the msgs in database
  //then here i insert this new comment into dtaabase and can just return this new comment alone
  const userID = user.id 
  const userName = user.userName
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

/*
function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Load comments (newest first)
export async function listQotdComments() {
  const all = readAll();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Create a comment
export async function createQotdComment({ text }) {
  const all = readAll();
  const newComment = {
    id: crypto.randomUUID(),
    author: "You",
    text,
    createdAt: new Date().toISOString(),
  };

  const updated = [newComment, ...all];
  writeAll(updated);
  return newComment;
}

*/