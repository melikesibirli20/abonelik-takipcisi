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

abonelikler.forEach(listeyeEkle);

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
  form.reset();
});