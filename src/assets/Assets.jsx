import icon_o_outline from "./icon-o-outline.svg";
import icon_o from "./icon-o.svg";
import icon_x_outline from "./icon-x-outline.svg";
import icon_x from "./icon-x.svg";
import restart from "./icon-restart.svg";
import logo from "./logo.svg";

const icons = [icon_o, icon_o_outline, icon_x, icon_x_outline, restart, logo];
icons.forEach((img) => (new Image().src = img));

// prettier-ignore
const path_x = (<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/>);

// prettier-ignore
const path_o = (<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>);

const assets = {
  icon_o_outline: icon_o_outline,
  icon_o: icon_o,
  icon_x_outline: icon_x_outline,
  icon_x: icon_x,
  icon_restart: restart,
  logo: logo,
  path_x: path_x,
  path_o: path_o,
};

export { assets };
