import { useState, useRef } from "react";
import { assets, cityList } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { motion, useReducedMotion } from "motion/react";

const toInputDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

// "2026-09-21" -> "21 Sep 2026" (parsed as a local date, no timezone shift)
const formatDate = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const countDays = (start, end) => {
  if (!start || !end) return 0;
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  const diff = (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000;
  return diff < 0 ? 0 : Math.max(diff, 1);
};

/* ------------------------------------------------------------------ */
/* Icons (inline, so there are no extra dependencies)                  */
/* ------------------------------------------------------------------ */

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

const SearchIcon = () => (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const ChevronIcon = () => (
  <svg {...iconProps} width={16} height={16}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Shared field styles                                                 */
/* ------------------------------------------------------------------ */

const fieldShell =
  "relative flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-left " +
  "transition-colors hover:bg-gray-50 focus-within:bg-gray-50 " +
  "focus-within:ring-2 focus-within:ring-primary md:rounded-full md:px-6";

const iconBubble =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light text-primary md:hidden";

const labelText = "block text-xs font-medium text-gray-500";
const valueText = "block truncate text-sm font-medium md:text-base";

/* ------------------------------------------------------------------ */
/* Date field                                                          */
/*                                                                     */
/* Mobile browsers (especially iOS Safari) show NOTHING for an empty   */
/* <input type="date">, so a placeholder is impossible on the input    */
/* itself. Instead we render our own text ("Add date" / formatted      */
/* date) and lay the real input over it, invisible but tappable, so    */
/* the native picker still opens everywhere.                           */
/* ------------------------------------------------------------------ */

const DateField = ({ id, label, placeholder, value, min, onChange }) => {
  const inputRef = useRef(null);

  const openPicker = () => {
    try {
      inputRef.current?.showPicker?.();
    } catch {
      /* Not supported: the browser's native tap behaviour still works. */
    }
  };

  return (
    <div className={fieldShell}>
      <span className={iconBubble}>
        <CalendarIcon />
      </span>

      <div className="min-w-0 flex-1">
        <span className={labelText} aria-hidden="true">
          {label}
        </span>
        <span
          className={`${valueText} ${value ? "text-gray-900" : "text-gray-400"}`}
          aria-hidden="true"
        >
          {value ? formatDate(value) : placeholder}
        </span>
      </div>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="date"
        aria-label={label}
        min={min}
        value={value}
        onChange={onChange}
        onClick={openPicker}
        required
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const HeroSection = () => {
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");
  const reduceMotion = useReducedMotion();

  const today = toInputDate(new Date());
  const days = countDays(pickupDate, returnDate);

  // Skip entrance animations for people who prefer reduced motion.
  const from = (values) => (reduceMotion ? false : values);

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickupDate(value);
    // Never leave a return date that is earlier than the new pickup date.
    if (returnDate && returnDate < value) setReturnDate("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pickupLocation || !pickupDate || !returnDate) return;
    if (returnDate < pickupDate) return;

    // URLSearchParams handles encoding (spaces, accents, etc. in city names).
    const params = new URLSearchParams({
      pickupLocation,
      pickupDate,
      returnDate,
    });
    navigate(`/cars?${params.toString()}`);
    // Note: the old code cleared the form/context here. That wiped the dates
    // the Cars page may still need, so it was removed.
  };

  return (
    <section className="relative overflow-hidden bg-light px-4 pb-8 pt-10 md:pb-12 md:pt-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:gap-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-3">
          <motion.h1
            initial={from({ opacity: 0, y: 20 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl"
          >
            Luxury cars on rent
          </motion.h1>
          <motion.p
            initial={from({ opacity: 0, y: 20 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md text-sm text-gray-600 md:text-base"
          >
            Choose a city and your dates to see what&apos;s available.
          </motion.p>
        </div>

        {/* Search form */}
        <motion.form
          initial={from({ opacity: 0, y: 20 })}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex w-full max-w-md flex-col rounded-3xl bg-white p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] ring-1 ring-gray-200/70 md:max-w-4xl md:flex-row md:items-center md:rounded-full"
        >
          <div className="flex flex-1 flex-col divide-y divide-gray-200 md:flex-row md:divide-x md:divide-y-0">
            {/* Pickup location */}
            <div className={fieldShell}>
              <span className={iconBubble}>
                <PinIcon />
              </span>
              <div className="relative min-w-0 flex-1">
                <label htmlFor="pickup-location" className={labelText}>
                  Pickup location
                </label>
                <select
                  id="pickup-location"
                  name="pickupLocation"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className={`${valueText} w-full cursor-pointer appearance-none bg-transparent pr-6 outline-none ${
                    pickupLocation ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>
                    Choose a city
                  </option>
                  {cityList.map((city) => (
                    <option key={city} value={city} className="text-gray-900">
                      {city}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute bottom-0.5 right-0 text-gray-400">
                  <ChevronIcon />
                </span>
              </div>
            </div>

            {/* Pickup date */}
            <DateField
              id="pickup-date"
              label="Pickup date"
              placeholder="Add date"
              min={today}
              value={pickupDate}
              onChange={handlePickupChange}
            />

            {/* Return date */}
            <DateField
              id="return-date"
              label="Return date"
              placeholder="Add date"
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-primary-dull focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:mt-0 md:ml-2 md:rounded-full md:px-8"
          >
            <SearchIcon />
            Search cars
          </motion.button>
        </motion.form>

        {/* Rental length: fixed height so the layout doesn't jump */}
        <div
          className="-mt-2 h-5 text-sm font-medium text-gray-600"
          aria-live="polite"
        >
          {days > 0 && (
            <motion.p
              key={days}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {days}-day rental
            </motion.p>
          )}
        </div>

        {/* Car on a soft "stage" with a ground shadow */}
        <div className="relative w-full max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute inset-x-4 bottom-0 top-10 rounded-[50%] bg-white/70 md:inset-x-10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-3 left-1/2 h-4 w-3/5 -translate-x-1/2 rounded-full bg-black/25 blur-xl"
          />
          <motion.img
            initial={from({ opacity: 0, x: -80 })}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            src={assets.main_car}
            alt="Luxury car"
            className="relative mx-auto h-auto max-h-[18rem] w-full max-w-[640px] object-contain md:max-h-[22rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
