import AbstractForm from "../components/Abstract/AbstractForm";
import CommonHero from "./../components/CommonHero/CommonHero";
import abstractBg from "./../assets/img/abstract-bg.jpeg";

export default function Help() {
  return (
    <div>
      <CommonHero title="Submit your Abstract" info="" bg={abstractBg} />
      <AbstractForm />
    </div>
  );
}
