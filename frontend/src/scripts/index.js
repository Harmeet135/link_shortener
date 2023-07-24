import confetti from "canvas-confetti";
import QRious from "qrious";


export function createConfetti(button) {
  const buttonBounds = button.getBoundingClientRect();
  const confettiX = (buttonBounds.x + buttonBounds.width / 2) / window.innerWidth;
  const confettiY = buttonBounds.y / window.innerHeight;

  confetti({
    particleCount: 150,
    spread: 50,
    origin: { y: confettiY, x: confettiX },
  });
}


export function generateQR(shortenedLink) {
        const qrwrapper = document.getElementById("qr-wrapper");
    if (qrwrapper instanceof HTMLDivElement) {
        if (qrwrapper.classList.contains('hide')) {
            qrwrapper.classList.remove('hide');
        }
    }
  const png = document.getElementById("png");
  const webp = document.getElementById("webp");
  const jpg = document.getElementById("jpg");

  const qr = new QRious({
    element: document.getElementById('qr'),
    value: shortenedLink,
    size: 150,
  });

  if (png instanceof HTMLAnchorElement) {
    png.href = qr.toDataURL("image/png");
    png.download = shortenedLink + '.png';
  }

  if (webp instanceof HTMLAnchorElement) {
    webp.href = qr.toDataURL("image/webp");
    webp.download = shortenedLink + '.webp';
  }

  if (jpg instanceof HTMLAnchorElement) {
    jpg.href = qr.toDataURL("image/jpeg");
    jpg.download = shortenedLink + '.jpg';
  }
}
