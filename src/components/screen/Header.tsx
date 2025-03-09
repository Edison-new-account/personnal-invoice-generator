import { ROUTE_PATHS } from "@/routes/path";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";

interface HeaderProps {
  personalLogo?: string;
  className?: string;
  style?: React.CSSProperties;
}
const Header = ({ personalLogo = logo, style, className }: HeaderProps) => {
  const navigateTo = useNavigate();
  return (
    <div
      className={`bg-white shadow-md ${className}`}
      style={style}
      onClick={() => navigateTo(ROUTE_PATHS.HOME.ROOT)}
    >
      <img
        src={personalLogo || logo}
        alt="Logo personnel"
        style={{
          width: 100,
          height: 70,
          borderRadius: 20,
        }}
      />

      <div className="p-3 bold">
        <span>Visualiser mes projets personnels ici</span>
      </div>
    </div>
  );
};

export default Header;
