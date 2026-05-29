import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'contemp-living',
    title: 'Không gian sống đương đại',
    slug: 'khong-gian-song-duong-dai',
    region: 'THÀNH PHỐ HỒ CHÍ MINH',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABeleMCeTyHlL5fny8aASZ4iL2T3YVjQv5iPRxrRYN1xyfhaEyRZZ24HyImD0twGXSMiciag-RyLqOM8x8tmXqoedH4hhMdtEHpy6Dq1JlGmhDhPW9GC1DK_05fTXukt2CddS2z9bfxJbymXGmigzOuqe2ag5V4AC_RZ56P00Ge_bUBlCUUDdGJNqLZTRPbDlZl163I45qAlbVWBxjYx9q4bjGWCfhwPEmcxyw5PNqeVO74_Tf6698K8IHCZiJxLwq-Bn0laRosQ2i',
    description: 'Căn hộ đương đại cao cấp với sàn bê tông mài, cầu thang gỗ lơ lửng và đồ nội thất tối giản, đem lại trải nghiệm sang trọng tĩnh lặng.',
    fullStory: 'Dự án căn hộ áp mái tại trung tâm Quận 1 là sự kết hợp táo bạo giữa chất thô ráp của bê tông mài và sự ấm áp từ gỗ sồi tự nhiên. Thiết kế tối ưu hóa diện tích bằng cách mở rộng các khoảng thông tầng, đón lấy trọn vẹn ánh sáng hoàng hôn thành phố. Cầu thang gỗ nổi lửng đóng vai trò là một tác phẩm điêu khắc kiến trúc ở trung tâm ngôi nhà, nơi mỗi bước chân đều cảm nhận được nhịp điệu của ánh sáng chuyển động trong ngày.',
    materials: ['Bê tông mài', 'Gỗ sồi tự nhiên', 'Thép đen nhám', 'Vải lanh tự nhiên'],
    size: '180 m²'
  },
  {
    id: 'bright-space',
    title: 'Không gian sáng',
    slug: 'khong-gian-sang',
    region: 'ĐÀ NẴNG',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT8nQd5q3pQdBQcncQXdkboruFzLuLIbug7str_XVFhAcjbAUBIC-Z4giwPK3Ga3zcu0T7RjvxHv7aqzDS3qZEXXT3vH0CGXD7G6ygPqqcIeWkrS2Xw4C2SK6u8_Ndi_VI2T09FxXX-RxmqJJvJjtti2oHZnZ8ac79C36AJiY_h8_KM85wS7T3JU2hdAJ4lNhe3GzGhjG5uww-HoFEipYbGRSFr8kGkOq0SWOJuQjELaJFsm-mbv8Ib9yGFIMSvnH2EmDNISzEILGs',
    description: 'Biệt thự ven biển ngập tràn ánh nắng kết hợp giữa phong cách Địa Trung Hải cổ điển và tinh thần tối giản ấm áp Việt Nam.',
    fullStory: 'Nằm nép mình bên bờ biển Mỹ Khê thanh bình, biệt thự được thiết kế như một ốc đảo đầy gió và nắng. Các bức tường thạch cao trắng hoàn thiện thủ công tạo ra độ bắt sáng mờ tinh tế. Cửa sổ kính kịch trần cỡ lớn mở rộng góc nhìn 180 độ ra biển khơi, xóa mờ khoảng cách giữa không gian sống trong nhà và thiên nhiên tự do bên ngoài. Sân trong với thảm xanh tươi giúp làm dịu không khí biển mặn và tạo điểm tựa thư giãn tuyệt đối cho gia chủ.',
    materials: ['Thạch cao trắng hoàn thiện', 'Gỗ tếch chịu mặn', 'Đá tự nhiên', 'Sợi cói dệt thủ công'],
    size: '320 m²'
  },
  {
    id: 'hanoi-living',
    title: 'Phòng khách tối giản',
    slug: 'phong-khach-toi-gian',
    region: 'HÀ NỘI',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    description: 'Một không gian phòng khách nhỏ thanh lịch, ngập tràn ánh sáng mềm mại từ giếng trời rọi thẳng vào những vật liệu ấm áp.',
    fullStory: 'Tọa lạc tại một ngõ nhỏ đặc trưng của thủ đô Hà Nội, căn biệt thự phố này đối mặt với bài toán thiếu hụt ánh sáng tự nhiên. Giải pháp của chúng tôi là tạo nên một trục giếng trời xuyên suốt, mang ánh sáng dịu nhẹ trải đều xuống phòng khách. Những diện tường hoàn thiện bằng vôi dừa nung và bộ sofa màu beige mang đến cảm giác mộc mạc, yên bình, tách biệt hoàn toàn khỏi sự nhộn nhịp của phố thị bên ngoài.',
    materials: ['Sơn hiệu ứng vôi dừa', 'Gỗ tần bì', 'Sợi tơ chuối dệt bọc sofa', 'Đá vôi xám'],
    size: '120 m²'
  },
  {
    id: 'hoian-serene',
    title: 'Không gian yên tĩnh',
    slug: 'khong-gian-yen-tinh',
    region: 'HỘI AN',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'Nghỉ dưỡng tĩnh tại lấy cảm hứng từ kiến trúc phố cổ truyền thống, sử dụng gỗ mộc và ngói đất nung thủ công.',
    fullStory: 'Ngôi nhà mang đậm âm hưởng vùng di sản, sử dụng hệ kết cấu gỗ mộc truyền thống kết hợp tinh tế cùng ngôn ngữ tối giản hiện đại. Các vách ngăn xếp lá sách linh hoạt cho phép điều chỉnh dòng gió đối lưu vào mùa nóng, đồng thời vẽ nên những vệt nắng thơ mộng trên sàn nhà. Đây là nơi tìm lại sự cân bằng, sự lặng nghe dòng chảy thời gian giữa tiếng xì xào của lá dừa nước bên dòng sông Thu Bồn.',
    materials: ['Gỗ kiền kiền mộc', 'Gạch gốm thủ công Quảng Phương', 'Trát tường đất vôi', 'Đồng thau giả cổ'],
    size: '220 m²'
  },
  {
    id: 'nhatrang-hideaway',
    title: 'Nơi ẩn náu ven biển',
    slug: 'noi-an-nau-ven-bien',
    region: 'NHA TRANG',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    description: 'Công trình nằm cheo leo trên vách đá ven biển Nha Trang với lối thiết kế giấu mình hoàn toàn vào rặng đá khối.',
    fullStory: 'Khởi nguồn từ mong muốn tạo ra một không gian trú ẩn tuyệt mật hòa quyện với sóng gió đại dương, chúng tôi áp dụng trường phái Brutalism tối giản hóa. Cấu trúc bê tông trần xám sáng được đúc trực tiếp bằng khuôn ván gỗ, tạo ra các đường vân thô mộc như các vết rạn trên vách đá tự nhiên. Mọi góc thu vào tầm mắt đều kết thúc bằng mặt nước biển xanh biếc, mang lại định nghĩa thực sự về sự sống và sự xa xỉ yên bình.',
    materials: ['Bê tông cốt tre tạo vân gỗ', 'Đá granite nguyên khối', 'Kính hộp cách nhiệt', 'Gỗ thông ép dầu'],
    size: '280 m²'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'interior-design',
    index: '01',
    title: 'Thiết kế nội thất',
    description: 'Từ ý tưởng đến hoàn thành. Lựa chọn vật liệu, thiết kế ánh sáng, và xây dựng không gian sống ấm áp.',
    fullDetail: 'Chúng tôi đồng hành cùng bạn xuyên suốt toàn bộ quá trình: khảo sát hiện trạng, phác thảo mặt bằng ý tưởng 2D, phối cảnh 3D trực quan, triển khai chi tiết cấu tạo kỹ thuật đồ gỗ và chọn lựa, cung cấp các thiết bị nội thất cao cấp. Mọi chi tiết thiết kế đều hướng tới công năng thực chất và nâng tầm thẩm mỹ tinh khiết.'
  },
  {
    id: 'space-consultant',
    index: '02',
    title: 'Tư vấn không gian',
    description: 'Hỗ trợ khách hàng tìm kiếm sự cân bằng giữa tối giản và ấm cúng thông qua các giải pháp kiến trúc sáng tạo.',
    fullDetail: 'Thích hợp cho khách hàng đang phân vân phương án phân chia công năng, phân bổ ánh sáng hoặc cải tạo lại nền tảng kiến trúc hiện hữu. Buổi tư vấn chuyên sâu của chủ trì kiến trúc sư sẽ giải đáp các vấn đề về luồng giao thông nhà ở, giải pháp thông gió tự nhiên hiệu quả và lựa chọn gam màu, tối ưu chi phí đầu tư.'
  },
  {
    id: 'material-research',
    index: '03',
    title: 'Nghiên cứu vật liệu',
    description: 'Khám phá những chất liệu truyền thống Việt Nam. Sự kết hợp giữa bê tông hiện đại, gỗ sồi tự nhiên và đất sét nung.',
    fullDetail: 'Studio không ngừng tìm tòi sự giao thoa bản địa độc đáo. Chúng tôi hợp tác trực tiếp với các làng nghề gốm thủ công, cơ sở dệt vải lanh vùng cao và xưởng bê tông đúc sẵn nghệ thuật nhằm nghiên cứu ra các mẫu bề mặt vật liệu tùy biến riêng, tạo nên dấu ấn độc nhất vô nhị chỉ có ở công trình của NOU DESIGN.'
  },
  {
    id: 'architecture-interior',
    index: '04',
    title: 'Kiến trúc nội thất',
    description: 'Thiết kế toàn diện cho những ngôi nhà đương đại, tối ưu hóa công năng và thẩm mỹ trường tồn.',
    fullDetail: 'Giải pháp tổng thể sáp nhập kiến trúc kết cấu ngoại thất với không gian vi mô nội thất bên trong. Việc thống nhất ý đồ này ngay từ đầu giúp ngôi nhà đạt trạng thái cân bằng tuyệt đối từ hình khối vững chãi ngoài mặt tiền đến các chi tiết âm tường sắc sảo như bản vẽ trong từng ngăn kéo tủ, mang tới một tổ ấm hoàn thiện không lỗi mốt.'
  }
];
