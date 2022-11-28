export const VerifyTemplate = (
    payload: any,
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        background-color: #dddd;
        font-family: sans-serif;
      }
      table {
        width: 100%;
        border-spacing: 0;
      }
      .email-body {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
      }

      .email-top {
        height: 30px;
        width: 100%;
        background: #171a1b;
      }

      .email-header {
        background-color: #363636;
        height: 102px;
        width: 100%;
        padding: 0;
        margin: 0;
      }

      .social-icon {
        width: 25px;
        padding: 4px;
      }

      .verify-button {
        background: #171a1b;
        padding: 0.5rem 1rem;
        display: inline-block;
        border-radius: 5px;
        color: whitesmoke;
        text-decoration: none;
      }

      .verify-button:hover {
        background-color: #363636;
      }

      .verify {
        background-color: #171a1b;
        color: whitesmoke;
        padding: 1rem 2rem;
      }
    </style>
  </head>
  <body>
    <div class="email-body">
      <table>
        <tbody>
          <tr>
            <td class="email-top"></td>
          </tr>
          <tr>
            <td class="email-header">
              <table>
                <tr>
                  <td>
                    <a href="#">
                      <img src="https://i.hizliresim.com/g9h8vse.PNG" alt="" style="padding: 20px" />
                    </a>
                  </td>

                  <td>
                    <div class="social-icon-container">
                      <a href="">
                        <img
                          class="social-icon"
                          width="20"
                          src="https://i.hizliresim.com/encdgdx.png"
                          alt=""
                        />
                      </a>
                      <a href="">
                        <img
                          class="social-icon"
                          width="20"
                          src="https://i.hizliresim.com/o00b765.png"
                          alt=""
                      /></a>
                      <a href="">
                        <img
                          class="social-icon"
                          width="20"
                          src="https://i.hizliresim.com/1fi0r3h.png"
                          alt=""
                      /></a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                Sayin ${payload.name} all!ins smoke house'a hos geldiniz. Uyeliginizi tamamlamak icin
                buttona tiklayiniz veya dogrulama kodunuzu allins.com.tr/verify
                adresine giriniz
              </p>

              <a
                class="verify-button"
                href="http://allins.com.tr/verify/1241231"
              >
                Hesabimi dogrula
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <div>
                <br />
                <span> Dogrulama kodunuz;</span>
                <h1 class="verify">${payload.token}</h1>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;
