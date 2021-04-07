// index.js

/*** API UTILS ***/

class APIUtils {
   static saveNewPost() {
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.open('POST', '/save_post', false); // false for synchronous request
      const form = document.getElementById('composer-form');
      const formData = new FormData(form);
      xmlHttp.send(formData);
   }

   static getPosts() {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', '/get_posts', false); // false for synchronous request
      xmlHttp.send({});
      if (xmlHttp == null) {
         return [];
      }
      const response = JSON.parse(xmlHttp.responseText);
      if (response == null) {
         return []
      }
      return response.posts;
   }
}

/*** HEADER ***/

function Header() {
   return (
      <div className="header">
         <img id="header-image" src="./static/journal.jpg" />
         <h1>My Journal</h1>
      </div>
   );
}

/*** COMPOSER ***/

function Composer(props) {
   const [textareaValue, setTextAreaValue] = React.useState('');

   const handleTextareaChange = (event) => {
      setTextAreaValue(event.target.value);
   }
   const handleComposerSubmit = (event) => {
      event.preventDefault();
      props.onSubmitPost(textareaValue);
      setTextAreaValue('');
   }

   return (
      <div className="composer">
         <h2 id="form-heading">What's on your mind?</h2>
         <form id="composer-form" onSubmit={handleComposerSubmit} >
            <label>
               <textarea
                  id="form-textarea"
                  name="post-text"
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  placeholder="Write your next post."
                  rows="10"
                  cols="62"
               />
               <br />
            </label>
            <input type="submit" value="Post" />
         </form>
      </div>
   );
}

/*** FEED ***/

function Feed(props) {
   const posts = props.posts.map((post, index) =>
      <Post key={index} date={post.date} text={post.text} />
   );
   return <div>{posts}</div>;
}

function Post(props) {
   return (
      <div className="post">
         <h2>{props.date}</h2>
         <p>{props.text}</p>
      </div>
   );
}

/*** FOOTER ***/

function Footer() {
   return (
      <div className="footer">
         <p>Created by TXST ACM Chapter (<a href="https://twitter.com/TxStateACM">follow us on Twitter</a>)</p>
         <p>Copyright 2021</p>
      </div>
   );
}

/*** NAV BAR ***/
function NavBar() {
   return (
      <div className='navbar'>
         <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
         </ul>
      </div>
   );
}

/*** MAIN PAGE ***/

function MainPage() {
   const [posts, setPosts] = React.useState([]);

   React.useEffect(() => {
      setPosts(APIUtils.getPosts());
   }, []);

   const onSubmitPost = (text) => {
      APIUtils.saveNewPost();
      setPosts(APIUtils.getPosts());
   }

   return (
      <div>
         <NavBar />
         <Header />
         <Composer onSubmitPost={onSubmitPost} />
         <Feed posts={posts} />
         <Footer />
      </div>
   );
}

/*** ABOUT PAGE ***/

function AboutPage() {
   return (
      <div>
         <NavBar />
         <h1>About My Journal</h1>
         <p>This simple web application demo was developed as a teaching tool to help students get started on basic web application development.</p>
         <Footer />
      </div>
   );
}

/*** APP ***/

function App() {
   const page = APP_NAMESPACE.get('page');

   if (page === 'index') {
      return (
         <MainPage />
      );
   } else if (page === 'about') {
      return (
         <AboutPage />
      );
   } else {
      return (
         <div>Sorry, this page cannot be found.</div>
      );
   }
}

ReactDOM.render(
   <App />,
   document.getElementById('root')
);
