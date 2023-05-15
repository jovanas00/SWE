export function formatirajDatum(datum) {
    const formatiran = new Date(datum);
    const opcije = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return formatiran.toLocaleString('en-US', opcije);
}