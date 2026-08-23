/* ============================================================
   EINFACH ANPASSEN
   ============================================================ */

const CONFIG = {
  // Supabase:
  // Project URL + PUBLIC / PUBLISHABLE Key eintragen.
  //
  // Beispiel:
  // supabaseUrl: "https://abcdefghijk.supabase.co",
  // supabasePublishableKey: "sb_publishable_...",
  //
  // WICHTIG:
  // Niemals sb_secret_... oder service_role hier eintragen!
  supabaseUrl: "https://kyzwxsjivdazuaxoxigx.supabase.co",
  supabasePublishableKey: "sb_publishable_rpv_USBNJTIGCi9l4HdsLw_x8wYcX2T",

  // Länder hier beliebig ergänzen/entfernen.
  countries: [
    ["AL", "Albanien"], ["DZ", "Algerien"], ["AD", "Andorra"],
    ["AM", "Armenien"], ["AZ", "Aserbaidschan"], ["AU", "Australien"],
    ["EG", "Ägypten"], ["BE", "Belgien"], ["BA", "Bosnien und Herzegowina"],
    ["BG", "Bulgarien"], ["DE", "Deutschland"], ["DK", "Dänemark"],
    ["EE", "Estland"], ["FI", "Finnland"], ["FR", "Frankreich"],
    ["GE", "Georgien"], ["GR", "Griechenland"], ["IE", "Irland"],
    ["IS", "Island"], ["IL", "Israel"], ["IT", "Italien"],
    ["JO", "Jordanien"], ["CA", "Kanada"], ["HR", "Kroatien"],
    ["LV", "Lettland"], ["LB", "Libanon"], ["LY", "Libyen"],
    ["LT", "Litauen"], ["LU", "Luxemburg"], ["MA", "Marokko"],
    ["MT", "Malta"], ["MD", "Moldau"], ["MC", "Monaco"],
    ["ME", "Montenegro"], ["NL", "Niederlande"], ["MK", "Nordmazedonien"],
    ["NO", "Norwegen"], ["AT", "Österreich"], ["PL", "Polen"],
    ["PT", "Portugal"], ["RO", "Rumänien"], ["SM", "San Marino"],
    ["SE", "Schweden"], ["CH", "Schweiz"], ["RS", "Serbien"],
    ["SK", "Slowakei"], ["SI", "Slowenien"], ["ES", "Spanien"],
    ["CZ", "Tschechien"], ["TN", "Tunesien"], ["TR", "Türkei"],
    ["UA", "Ukraine"], ["HU", "Ungarn"], ["VA", "Vatikanstadt"],
    ["GB", "Vereinigtes Königreich"], ["CY", "Zypern"]
  ]
};

/* ============================================================ */

const form = document.querySelector("#registrationForm");
const countrySelect = document.querySelector("#countrySelect");
const formMessage = document.querySelector("#formMessage");
const availabilityStatus = document.querySelector("#availabilityStatus");
const submitButton = form.querySelector("button[type='submit']");
const countryFlag = document.querySelector("#countryFlag");

/* ============================================================
   FLAGS
   ============================================================ */

function updateCountryFlag() {
  const code = countrySelect.value.toLowerCase();

  if (!code) {
    countryFlag.className = "country-flag";
    return;
  }

  countryFlag.className = `country-flag fi fi-${code} visible`;
}

countrySelect.addEventListener("change", updateCountryFlag);

/* ============================================================
   SUPABASE
   ============================================================ */

function isSupabaseConfigured() {
  return Boolean(
    CONFIG.supabaseUrl.trim() &&
    CONFIG.supabasePublishableKey.trim()
  );
}

function getSupabaseBaseUrl() {
  return CONFIG.supabaseUrl.replace(/\/+$/, "");
}

/**
 * Direkter PostgREST-RPC-Aufruf.
 *
 * Bei sb_publishable_... wird bewusst KEIN
 * Authorization: Bearer ... Header gesetzt.
 *
 * Der Publishable Key gehört ausschließlich in "apikey".
 */
async function rpc(functionName, body = {}) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }

  const response = await fetch(
    `${getSupabaseBaseUrl()}/rest/v1/rpc/${encodeURIComponent(functionName)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": CONFIG.supabasePublishableKey
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    let code = "";

    try {
      const error = await response.json();

      message =
        error.message ||
        error.error_description ||
        error.hint ||
        message;

      code = error.code || "";
    } catch (_) {
      // Antwort war kein JSON.
    }

    const rpcError = new Error(message);
    rpcError.status = response.status;
    rpcError.code = code;

    throw rpcError;
  }

  const text = await response.text();

  return text ? JSON.parse(text) : null;
}

/* ============================================================
   UI
   ============================================================ */

function setStatus(text, type = "") {
  availabilityStatus.className = `availability ${type}`.trim();

  const textElement =
    availabilityStatus.querySelector("span:last-child");

  if (textElement) {
    textElement.textContent = text;
  }
}

function setFormMessage(text, type = "") {
  formMessage.className = `form-message ${type}`.trim();
  formMessage.textContent = text;
}

/* ============================================================
   LÄNDER
   ============================================================ */

function fillCountries(taken = []) {
  const previous = countrySelect.value;

  const takenSet = new Set(
    taken.map(code => String(code).toUpperCase())
  );

  countrySelect.innerHTML =
    '<option value="">Land auswählen …</option>';

  CONFIG.countries.forEach(([code, name]) => {
    if (takenSet.has(code)) {
      return;
    }

    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;

    countrySelect.appendChild(option);
  });

  if (
    [...countrySelect.options].some(
      option => option.value === previous
    )
  ) {
    countrySelect.value = previous;
  }

  updateCountryFlag();
}

/* ============================================================
   VERFÜGBARKEIT
   ============================================================ */

async function loadAvailability() {
  fillCountries();

  if (!isSupabaseConfigured()) {
    setStatus(
      "Demo-Modus: Länder werden lokal angezeigt. Für echtes First Come First Serve Supabase konfigurieren.",
      "offline"
    );

    return;
  }

  try {
    const rows = await rpc("get_taken_countries");

    const taken = Array.isArray(rows)
      ? rows
          .map(row => row.country)
          .filter(Boolean)
      : [];

    fillCountries(taken);

    const validTaken = taken.filter(code =>
      CONFIG.countries.some(([countryCode]) => countryCode === code)
    );

    const free = Math.max(
      CONFIG.countries.length - validTaken.length,
      0
    );

    setStatus(
      `${free} Länder aktuell verfügbar`,
      "ready"
    );
  } catch (error) {
    console.error("Fehler beim Laden der Länder:", error);

    setStatus(
      "Verfügbarkeit konnte gerade nicht geladen werden.",
      "offline"
    );
  }
}

/* ============================================================
   FORMULAR
   ============================================================ */

form.addEventListener("submit", async event => {
  event.preventDefault();

  setFormMessage("");

  if (!form.reportValidity()) {
    return;
  }

  if (!isSupabaseConfigured()) {
    setFormMessage(
      "Für verbindliche, geräteübergreifende Anmeldungen muss Supabase zuerst in app.js konfiguriert werden.",
      "error"
    );

    return;
  }

  const data = new FormData(form);

  const selectedCountry = String(
    data.get("country") || ""
  ).toUpperCase();

  // Zusätzliche Prüfung im Frontend.
  // Die eigentliche Sicherheitsprüfung erfolgt trotzdem in PostgreSQL.
  const validCountry = CONFIG.countries.some(
    ([code]) => code === selectedCountry
  );

  if (!validCountry) {
    setFormMessage(
      "Bitte wähle ein gültiges Land aus.",
      "error"
    );

    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Wird gespeichert …";

  try {
    await rpc("register_participant", {
      p_name: String(data.get("name") || "").trim(),
      p_country: selectedCountry,
      p_song: String(data.get("song") || "").trim(),
      p_youtube: String(data.get("youtube") || "").trim(),
      p_spotify: String(data.get("spotify") || "").trim(),
      p_filming: data.get("filming"),
      p_concept: data.get("concept"),
      p_editing: data.get("editing")
    });

    const countryName =
      CONFIG.countries.find(
        ([code]) => code === selectedCountry
      )?.[1] || selectedCountry;

    form.reset();
    updateCountryFlag();

    setFormMessage(
      `Geschafft! ${countryName} ist jetzt für dich reserviert.`,
      "success"
    );

    await loadAvailability();
  } catch (error) {
    console.error("Fehler bei Anmeldung:", error);

    /*
     * PostgreSQL UNIQUE violation = 23505.
     * Darauf sollten wir uns verlassen statt auf Textsuche.
     */
    if (error.code === "23505") {
      setFormMessage(
        "Dieses Land wurde leider gerade eben von jemand anderem reserviert. Bitte wähle ein anderes.",
        "error"
      );

      await loadAvailability();
    } else if (error.code === "22023") {
      setFormMessage(
        "Einige Angaben sind ungültig. Bitte überprüfe deine Eingaben.",
        "error"
      );
    } else {
      setFormMessage(
        "Die Anmeldung konnte nicht gespeichert werden. Bitte versuche es noch einmal.",
        "error"
      );
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent =
      "Land verbindlich sichern →";
  }
});

/* ============================================================
   START
   ============================================================ */

loadAvailability();