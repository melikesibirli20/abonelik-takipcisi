const form = document.querySelector("#abonelik-formu");
const liste = document.querySelector("#abonelik-listesi");
const kayitAnahtari = "abonelik-takipcisi-yeni";
const abonelikler = JSON.parse(localStorage.getItem(kayitAnahtari) ?? "[]");

function listeyeEkle(abonelik) {
  const satir = document.createElement("li");
  const ucret = (abonelik.ucretKurus / 100).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  satir.textContent = `${abonelik.ad} · ${ucret} TL · Ayın ${abonelik.gun}. günü`;
  liste.append(satir);
}
function toplamiGuncelle() {
  const toplamKurus = abonelikler.reduce((toplam, abonelik) => {
    return toplam + abonelik.ucretKurus;
  }, 0);

  const tutar = (toplamKurus / 100).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  document.querySelector("#aylik-toplam").textContent = `${tutar} TL`;
}
abonelikler.forEach(listeyeEkle);
abonelikler.forEach(listeyeEkle);
toplamiGuncelle(); // Yeni satır

form.addEventListener("submit", (olay) => {
form.addEventListener("submit", (olay) => {
  olay.preventDefault();

  const alanlar = new FormData(form);
  const ad = alanlar.get("ad").trim();
  if (!ad) {
    alert("Abonelik adını yaz.");
    return;
  }

  const abonelik = {
    ad,
    ucretKurus: Math.round(Number(alanlar.get("ucret")) * 100),
    gun: Number(alanlar.get("gun")),
  };

  localStorage.setItem(kayitAnahtari, JSON.stringify([...abonelikler, abonelik]));
  abonelikler.push(abonelik);
  listeyeEkle(abonelik);
  abonelikler.push(abonelik);
  listeyeEkle(abonelik);
  toplamiGuncelle(); // Yeni satır
  form.reset();
});
  form.reset();
});