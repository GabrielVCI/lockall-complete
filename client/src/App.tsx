import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import HowItWorks from "./pages/HowItWorks";
import Security from "./pages/Security";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/soluciones" component={Solutions} />
      <Route path="/como-funciona" component={HowItWorks} />
      <Route path="/seguridad" component={Security} />
      <Route path="/sobre-lockall" component={About} />
      <Route path="/recursos" component={Resources} />
      <Route path="/contacto" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.warn("⚠️ reCAPTCHA site key not configured. Please set VITE_RECAPTCHA_SITE_KEY in .env");
  }

  return (
    <ErrorBoundary>
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey || ""}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </GoogleReCaptchaProvider>
    </ErrorBoundary>
  );
}

export default App;
