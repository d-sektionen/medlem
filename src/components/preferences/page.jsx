import React, { useContext } from "react";
import BigPixels from "../layout/bigPixels";
import { LoadingContext, UserContext } from "../layout/layout";
import { GridContainer, GridItem } from "../ui/grid";
import TitleChooser from "../ui/titleChooser";
import usePageContext from "../usePageContext";
import CalendarSubscriptions from "./calendarSubscriptions";
import Preferences from "./preferences";

const PreferencesPage = () => {
  const { title } = usePageContext();

  const setLoading = useContext(LoadingContext)[1];
  const [user, setUser] = useContext(UserContext);
  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser title={title} />
        </GridItem>
        <GridItem>
          <Preferences user={user} setUser={setUser} setLoading={setLoading} />
        </GridItem>
        <GridItem>
          <CalendarSubscriptions />
        </GridItem>
      </GridContainer>
    </BigPixels>
  );
};

export default PreferencesPage;
