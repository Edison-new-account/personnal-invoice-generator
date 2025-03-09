import { Card, CardContent } from "@/components/ui/card";
import "./home.css";
import _ from "lodash";
import { LABELS, PathRoute, ROUTE_PATHS } from "@/routes/path";
import { useNavigate } from "react-router";

const HomeBody = () => {
  const navigateTo = useNavigate();

  const allowedPaths: PathRoute[] = _.reject(
    _.keys(PathRoute) as PathRoute[],
    (key) => key === PathRoute.HOME
  );
  return (
    <div className="home">
      {allowedPaths.map((path) => (
        <Card
          key={path}
          className="px-4 card"
          style={{
            width: 300,
            height: 200,
          }}
          onClick={() => navigateTo(ROUTE_PATHS[path]["ROOT"])}
        >
          <CardContent className="card-content">
            <span>{LABELS[path]}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomeBody;
