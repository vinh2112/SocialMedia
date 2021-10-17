export default function handleToast({
  message = "",
  type = "",
  duration = 2000,
}) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    const autoRemoveChild = setTimeout(() => {
      main.removeChild(toast);
    }, duration + 1000);

    toast.onclick = (e) => {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveChild);
      }
    };

    const icon = {
      success: "clarity:success-standard-solid",
      danger: "ic:round-dangerous",
      warning: "clarity:warning-standard-solid",
    };

    toast.classList.add("toast", `toast--${type}`);
    const delay = (duration / 1000).toFixed(2);

    toast.style.animation = `slideInRight 0.5s ease, dropDown 1s ease ${delay}s forwards`;
    toast.innerHTML = `
        <div class="toast__icon">
            <span class="iconify" data-icon="${icon[type]}"></span>
        </div>
        <div class="toast__message">${message}</div>
        <div class="toast__close">
            <span class="iconify" data-icon="eva:close-fill"></span>
        </div>     
    `;
    main.appendChild(toast);
  }
}
