import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { contentWrapper } from "../../scss/layout.module.scss";
import BackendService from "../request/backendService";
import { Button } from "../ui/buttons";
import { GridContainer, GridItem } from "../ui/grid";
import usePageContext from "../usePageContext";
import BigPixels from "./bigPixels";
import LoginPage from "./loginPage";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";

const LayoutContent = ({ children, userContextValue, loadingContextValue }) => {
  const pageContext = usePageContext();

  const [user, setUser] = userContextValue;
  const [loading, setLoading] = loadingContextValue;
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  const requiredPrivileges = pageContext.requiredPrivileges;
  const [hasPrivileges, setHasPrivileges] = useState(false);

  useEffect(() => {
    setHasPrivileges(
      requiredPrivileges === undefined || user?.privileges[requiredPrivileges],
    );
  }, [user, requiredPrivileges]);

  useEffect(() => {
    setHasPrivileges(
      requiredPrivileges === undefined || user?.privileges[requiredPrivileges],
    );
  }, [user, requiredPrivileges]);

  const loggedIn = user !== null;

  // Get the user data from the backend and set it in the context
  useEffect(async () => {
    try {
      setLoading(true);
      const { data } = await BackendService.get("/account/me/");
      setUser(data);
      setError(null);
    } catch (err) {
      setUser(null);

      if (!err.response) {
        setError(
          <>
            <p>Kommunikation med servern kunde inte etableras.</p>
            <Button onClick={() => window.location.reload()}>
              Ladda om sidan
            </Button>
          </>,
        );
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser]);

  // Page is loading
  if (loading) {
    return <BigPixels />;
  }

  return (
    <>
      {user && (
        <>
          <SideMenu open={sideMenuOpen} close={() => setSideMenuOpen(false)} />
          <TopBar user={user} openMenu={() => setSideMenuOpen(true)} />
        </>
      )}
      <div className={contentWrapper}>
        {/* Display page */}
        {loggedIn && hasPrivileges && children}
        {/* Missing privileges */}
        {loggedIn && !hasPrivileges && (
          <BigPixels>
            <GridContainer>
              <GridItem>
                <p>
                  Ditt konto saknar privilegierna att se denna sida. Kontakta
                  webmaster om du anser att detta är fel.
                </p>
              </GridItem>
            </GridContainer>
          </BigPixels>
        )}
        {/* Login error */}
        {!loggedIn && error && (
          <BigPixels>
            <GridContainer>
              <GridItem>{error}</GridItem>
            </GridContainer>
          </BigPixels>
        )}
        {/* Display login page */}
        {!loggedIn && !error && <LoginPage></LoginPage>}
      </div>
    </>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
  userContextValue: PropTypes.array.isRequired,
  loadingContextValue: PropTypes.array.isRequired,
};

export default LayoutContent;
