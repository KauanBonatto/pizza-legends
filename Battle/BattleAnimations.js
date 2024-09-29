window.BattleAnimations = {
  async spin(event, onComplete) {
    const element = event.caster.pizzaElement;
    const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
    element.classList.add(animationClassName);

    element.addEventListener("animationend", () => {
      element.classList.remove(animationClassName);
    }, { once: true });

    await utils.wait(100);
    onComplete();
  }
}