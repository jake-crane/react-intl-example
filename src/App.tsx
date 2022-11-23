import { useEffect, useState } from "react";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
import messages from "./app.messages";
import CurrencyInputWrapper from "./CurrencyInputWrapper";

const DEFAULT_LOCALE = "en";

const App = (): JSX.Element => {
  const [localeMessages, setLocaleMessages] = useState<
    Record<string, Record<string, string> | undefined>
  >({
    [DEFAULT_LOCALE]: undefined,
  });
  const [selectedLocale, setSelectedLocale] = useState(DEFAULT_LOCALE);
  const [currentLocale, setCurrentLocale] = useState(DEFAULT_LOCALE);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [rawAmount, setRawAmount] = useState<undefined | null | number>(123.45);

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
        <option value="en-CA">English Canadaian</option>
        <option value="en-GB">English Great Britian</option>
        <option value="en-AU">English Australian</option>
      </select>
      Currency
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="AUD">AUD</option>
      </select>
      <div>
        <CurrencyInputWrapper
          value={rawAmount ?? undefined}
          decimalsLimit={2}
          decimalScale={2}
          onValueChange={(value, name, values) => {
            setRawAmount(values?.float);
          }}
          intlConfig={{ locale: currentLocale, currency: selectedCurrency }}
        />
        <button onClick={() => {
          setRawAmount(amt => (amt ?? 0) + 1);
        }}>Add</button>
      </div>
      <div>
        <FormattedNumber value={rawAmount ?? 0} style="currency" currency={selectedCurrency} />
      </div>
    </IntlProvider>
  );
};

export default App;
