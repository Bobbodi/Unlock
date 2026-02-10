#backend where request for new comment comes in
#backend which then adds incoming requets to comments database then send the database to frontend

#flask as backend

#importing module
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

import os

load_dotenv()

#creating flask app instance
commentapp = Flask(__name__)
CORS(commentapp)

SUPABASE_URL = os.getenv("REACT_APP_SUPABASE_URL")
SUPABASE_KEY = os.getenv("REACT_APP_SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


#start
@commentapp.route('/comment/<userID>/<path:userMSG>')
def post_message(userID, userMSG) -> None:
    #code to include this message into supa database
    response = (
        supabase.table('users').update({"comment": userMSG}).eq("id", userID).execute()
    )
    return "comment is inserted"


@commentapp.route('/commentRetrieve')
def get_all_comments():
    # fetch all rows from the table's comment section incluidng username + userid
    response = (
        #not sure if id is required right now but perhaps to connect it might be
        #filter to only show rows where comment is not empty string
        #filter away current user's comment as well
        supabase.table("users").select('userName, comment, id').neq("comment", "").execute()
    )

    print(f'the resp data is {response.data}')
    return jsonify(response.data)

application = commentapp

if __name__ == "__main__":
    commentapp.run(debug=True)





