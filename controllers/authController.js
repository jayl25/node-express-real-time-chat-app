
const User = require('../models/user');

const loadLoginForm = (req, res) => {
    res.render("login", {title: "Login"});
}

const loadRegisterForm = (req, res) => {
    res.render("register", { title: "Register" });
};

const registerUser = async (req,res) => {
    const { fname, lname, username, email, password, cpassword } = req.body;

    if (password === cpassword){
        try{
            const user = new User({
                name: fname+ ' ' + lname,
                username: username,
                email: email,
                password: password,
            });
    
            await user.save();
        }catch (error){
            console.error(error);
        }
        res.redirect('/account/login');
    }else{
        res.locals.message = "Invalid credentials. Please try again!";
        res.locals.protocol = "danger";
        res.render('/account/register');
    }

}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try{
        const user = await User.findOne({ username });
        const isPasswordValid = await user.comparePassword(password);

        if (user && isPasswordValid){
            req.session.userId = user._id;
            req.session.username = username;
            req.session.loggedIn = true;

            return res.redirect('/');
        }
    }catch (error){
        console.error(error);
    }

}

const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        res.redirect('/account/login');
      }
    });
  };

module.exports = { loadRegisterForm, loadLoginForm, registerUser, loginUser, logout };