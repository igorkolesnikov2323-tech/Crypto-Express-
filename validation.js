function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(pass) {
  const symbolsOfPass = pass.split("");
  const regexUpper = /[A-Z]/;
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const numberRegex = /[0-9]/;

  if (
    pass.length > 8 &&
    symbolsOfPass.some((str) => numberRegex.test(str)) &&
    symbolsOfPass.some((str) => regexUpper.test(str)) &&
    symbolsOfPass.some((str) => specialCharsRegex.test(str))
  ) {
    return true;
  } else {
    console.log("password is not correct");
    if (pass.length <= 8) {
      console.log("Пароль слишком короткий");
    }
    if (!symbolsOfPass.some((str) => numberRegex.test(str))) {
      console.log("Пароль должен содержать цифры");
    }
    if (!symbolsOfPass.some((str) => regexUpper.test(str))) {
      console.log("Пароль должен сожержать заглавные буквы");
    }
    if (!symbolsOfPass.some((str) => specialCharsRegex.test(str))) {
      console.log("Пароль должен содержать специальные симовлы");
    }
    return false;
  }
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers["authorizaiton"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Access denied. No token provied." });
  }

  try {
    const decoded = jwt.verify(token, 'kjchvidu487kjv83r323jD4§"xcnx%%%!!');

    if (decoded !== "admin") {
      return res.status(401).json({ error: "Access denied. Admins only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { validateEmail, validatePassword };
