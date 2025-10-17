import OurAdvisors from "@/components/OurAdvisors";
import OurExTeamMember from "@/components/OurExTeamMember";
import OurTeamMember from "@/components/OurTeamMember";
import { HomePageDataContext } from "@/contexts/HomePageDataContext";
import { useContext } from "react";

const TeamPage = () => {
  const { advisorData, teamMemberData, exTeamData, loading, error } =
    useContext(HomePageDataContext);
  return (
    <>
      <OurAdvisors advisorData={advisorData} loading={loading} error={error} />
      <OurExTeamMember
        exTeamData={exTeamData}
        loading={loading}
        error={error}
      />
      <OurTeamMember
        teamMemberData={teamMemberData}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default TeamPage;
