import { useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "./app.messages";

const DEFAULT_LOCALE = "en";

const App = (): JSX.Element => {
  const [localeMessages, setLocaleMessages] = useState<
    Record<string, Record<string, string> | undefined>
  >({
    [DEFAULT_LOCALE]: undefined,
  });
  const [selectedLocale, setSelectedLocale] = useState(DEFAULT_LOCALE);
  const [currentLocale, setCurrentLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    if (selectedLocale === DEFAULT_LOCALE || localeMessages[selectedLocale]) {
      setCurrentLocale(selectedLocale);
    } else {
      fetch(`./lang/${selectedLocale}.json`)
        .then((resp) => resp.json())
        .then((data) => {
          setLocaleMessages({ ...localeMessages, [selectedLocale]: data });
          setCurrentLocale(selectedLocale);
        });
    }
  }, [selectedLocale, localeMessages]);

  return (
    <IntlProvider
      messages={localeMessages[currentLocale]}
      locale={currentLocale}
      defaultLocale={DEFAULT_LOCALE}
    >
      <h1>
        <FormattedMessage {...messages.greeting} />
      </h1>
      <select
        value={selectedLocale}
        onChange={(e) => setSelectedLocale(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es-MX">Mexican Spanish</option>
        <option value="fr-CA">French Canadaian</option>
      </select>
    </IntlProvider>
  );
};

export default App;
