export async function loadJSON() {
  try {
    const response = await fetch("../../perguntas.json");

    return await response.json();
  } catch (error) {
    console.error("Houve um problema com a requisição:", error);
  }
}
