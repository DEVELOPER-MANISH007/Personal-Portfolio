import {
  SiPython,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiStreamlit,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  FaBroom,
  FaSearch,
  FaChartLine,
  FaChartArea,
  FaTree,
  FaCogs,
  FaCheckCircle,
} from "react-icons/fa";

/* Central icon registry — maps a short key (used in content.js) to the
   actual react-icons component. Keeps content.js free of JSX/imports. */
const registry = {
  python: SiPython,
  sql: SiMysql,
  pandas: SiPandas,
  numpy: SiNumpy,
  broom: FaBroom,
  magnifier: FaSearch,
  sklearn: SiScikitlearn,
  chart: FaChartLine,
  tree: FaTree,
  gears: FaCogs,
  check: FaCheckCircle,
  matplotlib: FaChartLine,
  seaborn: FaChartArea,
  streamlit: SiStreamlit,
  mongodb: SiMongodb,
  express: SiExpress,
  react: SiReact,
  node: SiNodedotjs,
  git: SiGit,
  github: SiGithub,
  vscode: VscVscode,
};

export default function SkillIcon({ name, ...props }) {
  const Icon = registry[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
