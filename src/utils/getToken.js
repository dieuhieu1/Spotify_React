export function getTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const res = urlParams.get("access_token");

  return res;
}
export function getResponsePayment() {
  const params = new URLSearchParams(window.location.search);
  const amount = params.get("vnp_Amount") || "";
  const responseCode = params.get("vnp_ResponseCode") || "";
  const dataPayment = {
    responseCode: responseCode.toString(),
    amount: +amount,
  };
  return dataPayment; // Lấy giá trị tham số vnp_ResponseCode
}
