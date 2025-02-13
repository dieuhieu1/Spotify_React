export const countries = [
  {
    value: "US",
    label: (
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
          alt="US Flag"
          className="w-6 h-4 mr-2"
        />
        US
      </div>
    ),
  },
  {
    value: "VN",
    label: (
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
          alt="Vietnam Flag"
          className="w-6 h-4 mr-2"
        />
        VN
      </div>
    ),
  },
  {
    value: "GB",
    label: (
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/255px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
          alt="UK Flag"
          className="w-6 h-4 mr-2"
        />
        UK
      </div>
    ),
  },
];
export const months = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: `Tháng ${index + 1}`,
}));
